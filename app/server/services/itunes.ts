import axios from "axios"
import { z } from "zod"

// Schema for iTunes API response
const iTunesPodcastSchema = z.object({
  collectionId: z.number(),
  trackId: z.number(),
  artistName: z.string(),
  collectionName: z.string(),
  trackName: z.string(),
  collectionViewUrl: z.string(),
  feedUrl: z.string(),
  artworkUrl30: z.string().optional(),
  artworkUrl60: z.string().optional(),
  artworkUrl100: z.string().optional(),
  collectionPrice: z.number().optional(),
  trackPrice: z.number().optional(),
  releaseDate: z.string().optional(),
  collectionExplicitness: z.string().optional(),
  trackExplicitness: z.string().optional(),
  trackCount: z.number().optional(),
  trackTimeMillis: z.number().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  primaryGenreName: z.string().optional(),
  contentAdvisoryRating: z.string().optional(),
  artworkUrl600: z.string().optional(),
  genreIds: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
})

export type iTunesPodcast = z.infer<typeof iTunesPodcastSchema>

export interface iTunesSearchResponse {
  resultCount: number
  results: iTunesPodcast[]
}

const BASE_URL = "https://itunes.apple.com/search"

// Create an Axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "iPodcast-Search-App/1.0",
  },
  timeout: 15000, // 15 seconds timeout
})

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  backoffMultiplier: 2,
}

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to determine if error is retryable
const isRetryableError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    // Retry on 5xx errors, network errors, and timeouts
    return !status || status >= 500 || status === 429 || error.code === 'ECONNABORTED'
  }
  return false
}

export async function searchPodcasts(searchTerm: string): Promise<iTunesSearchResponse> {
  let lastError: unknown = null

  for (let attempt = 1; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`Searching iTunes API for: ${searchTerm} (attempt ${attempt}/${RETRY_CONFIG.maxRetries})`)
      
      const { data } = await api.get("", {
        params: {
          media: "podcast",
          term: searchTerm,
          limit: 50,
          country: "SA",
          lang: "ar",
        },
      })

      // Log the raw response for debugging
      console.log("Raw iTunes API response:", JSON.stringify(data, null, 2))

      // Validate the basic structure first
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid API response: Response is not an object")
      }

      if (!Array.isArray(data.results)) {
        throw new Error("Invalid API response: Results is not an array")
      }

      // Log the first result for debugging
      if (data.results.length > 0) {
        console.log("First result structure:", {
          keys: Object.keys(data.results[0]),
          sample: data.results[0]
        })
      }

      try {
        const validatedData = z.object({
          resultCount: z.number(),
          results: z.array(iTunesPodcastSchema),
        }).parse(data)

        if (validatedData.resultCount === 0) {
          throw new Error("No podcasts found for the given search term")
        }

        // console.log(`Successfully fetched ${validatedData.resultCount} podcasts`)
        return validatedData
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          console.error("Validation errors:", validationError.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          })))
        }
        throw new Error("Invalid response format from iTunes API")
      }
    } catch (error) {
      lastError = error
      
      if (axios.isAxiosError(error)) {
        console.error(`iTunes API error (attempt ${attempt}):`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.message,
          data: error.response?.data,
          code: error.code,
        })
        
        // If it's not a retryable error, throw immediately
        if (!isRetryableError(error)) {
          throw new Error(`iTunes API error: ${error.response?.status} ${error.response?.statusText}`)
        }
      } else if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors)
        throw new Error("Invalid response format from iTunes API")
      } else {
        console.error(`Error fetching from iTunes API (attempt ${attempt}):`, error)
      }

      // If this is the last attempt, throw the error
      if (attempt === RETRY_CONFIG.maxRetries) {
        throw new Error("Failed to fetch data from iTunes API after multiple attempts")
      }

      // Calculate delay for next retry
      const delayMs = RETRY_CONFIG.retryDelay * (RETRY_CONFIG.backoffMultiplier ** (attempt - 1))
      console.log(`Retrying in ${delayMs}ms...`)
      await delay(delayMs)
    }
  }

  // This should never be reached, but just in case
  throw lastError || new Error("Failed to fetch data from iTunes API")
} 
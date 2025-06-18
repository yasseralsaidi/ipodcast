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
  timeout: 20000, // Increased to 20 seconds
})

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 5, // Increased retries
  retryDelay: 2000, // Increased initial delay
  backoffMultiplier: 1.5, // Reduced backoff multiplier
}

// Fallback search terms for when the main search fails
const FALLBACK_SEARCH_TERMS = [
  "podcast",
  "technology",
  "business",
  "news",
  "entertainment",
  "education",
  "science",
  "health",
  "sports",
  "music",
  "comedy",
  "true crime",
  "history",
  "politics",
  "economics",
  "psychology",
  "philosophy",
  "literature",
  "art",
  "culture"
]

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to determine if error is retryable
const isRetryableError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    // Retry on 5xx errors, network errors, timeouts, and rate limits
    return !status || status >= 500 || status === 429 || error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND'
  }
  return false
}

// Helper function to validate and clean API response
const validateAndCleanResponse = (data: unknown): iTunesSearchResponse => {
  // Validate the basic structure first
  if (!data || typeof data !== 'object') {
    throw new Error("Invalid API response: Response is not an object")
  }

  const responseData = data as Record<string, unknown>
  
  if (!Array.isArray(responseData.results)) {
    throw new Error("Invalid API response: Results is not an array")
  }

  // Clean and validate each result
  const cleanedResults = responseData.results
    .filter((result: unknown) => result && typeof result === 'object')
    .map((result: unknown) => {
      const podcastResult = result as Record<string, unknown>
      return {
        collectionId: (podcastResult.collectionId as number) || (podcastResult.trackId as number) || 0,
        trackId: (podcastResult.trackId as number) || (podcastResult.collectionId as number) || 0,
        artistName: (podcastResult.artistName as string) || (podcastResult.artist as string) || "Unknown Artist",
        collectionName: (podcastResult.collectionName as string) || (podcastResult.collection as string) || "Unknown Collection",
        trackName: (podcastResult.trackName as string) || (podcastResult.title as string) || "Unknown Track",
        collectionViewUrl: (podcastResult.collectionViewUrl as string) || (podcastResult.url as string) || "",
        feedUrl: (podcastResult.feedUrl as string) || (podcastResult.feed as string) || "",
        artworkUrl30: (podcastResult.artworkUrl30 as string) || (podcastResult.artwork as string) || "",
        artworkUrl60: (podcastResult.artworkUrl60 as string) || (podcastResult.artwork as string) || "",
        artworkUrl100: (podcastResult.artworkUrl100 as string) || (podcastResult.artwork as string) || "",
        collectionPrice: (podcastResult.collectionPrice as number) || 0,
        trackPrice: (podcastResult.trackPrice as number) || 0,
        releaseDate: (podcastResult.releaseDate as string) || "",
        collectionExplicitness: (podcastResult.collectionExplicitness as string) || "",
        trackExplicitness: (podcastResult.trackExplicitness as string) || "",
        trackCount: (podcastResult.trackCount as number) || 0,
        trackTimeMillis: (podcastResult.trackTimeMillis as number) || 0,
        country: (podcastResult.country as string) || "",
        currency: (podcastResult.currency as string) || "",
        primaryGenreName: (podcastResult.primaryGenreName as string) || (podcastResult.genre as string) || "",
        contentAdvisoryRating: (podcastResult.contentAdvisoryRating as string) || "",
        artworkUrl600: (podcastResult.artworkUrl600 as string) || (podcastResult.artwork as string) || "",
        genreIds: Array.isArray(podcastResult.genreIds) ? podcastResult.genreIds as string[] : [],
        genres: Array.isArray(podcastResult.genres) ? podcastResult.genres as string[] : [],
      }
    })
    .filter(result => result.collectionId && result.artistName && result.collectionName)

  return {
    resultCount: cleanedResults.length,
    results: cleanedResults
  }
}

export async function searchPodcasts(searchTerm: string): Promise<iTunesSearchResponse> {
  let lastError: unknown = null

  // Try with the original search term first
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

      // Validate and clean the response
      const validatedData = validateAndCleanResponse(data)

      if (validatedData.resultCount === 0) {
        console.log(`No podcasts found for "${searchTerm}", will try fallback terms`)
        return { resultCount: 0, results: [] }
      }

      console.log(`Successfully fetched ${validatedData.resultCount} podcasts for "${searchTerm}"`)
      return validatedData
    } catch (error) {
      lastError = error
      
      if (axios.isAxiosError(error)) {
        console.error(`iTunes API error (attempt ${attempt}):`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.message,
          code: error.code,
        })
        
        // If it's not a retryable error, throw immediately
        if (!isRetryableError(error)) {
          throw new Error(`iTunes API error: ${error.response?.status} ${error.response?.statusText}`)
        }
      } else {
        console.error(`Error fetching from iTunes API (attempt ${attempt}):`, error)
      }

      // If this is the last attempt, try fallback search terms
      if (attempt === RETRY_CONFIG.maxRetries) {
        console.log(`All attempts failed for "${searchTerm}", trying fallback search terms...`)
        break
      }

      // Calculate delay for next retry
      const delayMs = RETRY_CONFIG.retryDelay * (RETRY_CONFIG.backoffMultiplier ** (attempt - 1))
      console.log(`Retrying in ${delayMs}ms...`)
      await delay(delayMs)
    }
  }

  // Try fallback search terms if the original search failed
  for (const fallbackTerm of FALLBACK_SEARCH_TERMS) {
    try {
      console.log(`Trying fallback search term: ${fallbackTerm}`)
      
      const { data } = await api.get("", {
        params: {
          media: "podcast",
          term: fallbackTerm,
          limit: 50,
          country: "US", // Use US for fallback terms
          lang: "en", // Use English for fallback terms
        },
      })

      const validatedData = validateAndCleanResponse(data)

      if (validatedData.resultCount > 0) {
        console.log(`Successfully fetched ${validatedData.resultCount} podcasts using fallback term "${fallbackTerm}"`)
        return validatedData
      }
      
      console.log(`No results found for fallback term "${fallbackTerm}"`)
    } catch (error) {
      console.error(`Fallback search failed for "${fallbackTerm}":`, error)
      // Continue to next fallback term instead of breaking
    }
  }

  // If all attempts fail, throw the last error
  throw lastError || new Error("Failed to fetch data from iTunes API after multiple attempts")
} 
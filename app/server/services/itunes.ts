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
  artworkUrl30: z.string(),
  artworkUrl60: z.string(),
  artworkUrl100: z.string(),
  collectionPrice: z.number(),
  trackPrice: z.number(),
  releaseDate: z.string(),
  collectionExplicitness: z.string(),
  trackExplicitness: z.string(),
  trackCount: z.number(),
  trackTimeMillis: z.number().optional(), // Make some fields optional
  country: z.string(),
  currency: z.string(),
  primaryGenreName: z.string(),
  contentAdvisoryRating: z.string().optional(), // Make some fields optional
  artworkUrl600: z.string(),
  genreIds: z.array(z.string()).optional(), // Make some fields optional
  genres: z.array(z.string()).optional(), // Make some fields optional
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
  },
  timeout: 10000, // 10 seconds timeout
})

export async function searchPodcasts(searchTerm: string): Promise<iTunesSearchResponse> {
  try {
    console.log(`Searching iTunes API for: ${searchTerm}`)
    
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
    if (axios.isAxiosError(error)) {
      console.error("iTunes API error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        data: error.response?.data,
      })
      throw new Error(`iTunes API error: ${error.response?.status} ${error.response?.statusText}`)
    }
    
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors)
      throw new Error("Invalid response format from iTunes API")
    }

    console.error("Error fetching from iTunes API:", error)
    throw new Error("Failed to fetch data from iTunes API")
  }
} 
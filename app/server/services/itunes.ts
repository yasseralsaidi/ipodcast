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
  trackTimeMillis: z.number(),
  country: z.string(),
  currency: z.string(),
  primaryGenreName: z.string(),
  contentAdvisoryRating: z.string(),
  artworkUrl600: z.string(),
  genreIds: z.array(z.string()),
  genres: z.array(z.string()),
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
    const { data } = await api.get("", {
      params: {
        media: "podcast",
        term: searchTerm,
        limit: 50,
      },
    })

    const validatedData = z.object({
      resultCount: z.number(),
      results: z.array(iTunesPodcastSchema),
    }).parse(data)

    return validatedData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("iTunes API error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
      })
      throw new Error(`iTunes API error: ${error.response?.status} ${error.response?.statusText}`)
    }
    console.error("Error fetching from iTunes API:", error)
    throw new Error("Failed to fetch data from iTunes API")
  }
} 
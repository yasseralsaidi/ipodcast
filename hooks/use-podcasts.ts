import { type iTunesPodcast, searchPodcasts } from "@/app/server/services/itunes"
import { useCallback, useEffect, useState } from "react"

interface UsePodcastsResult {
  podcasts: iTunesPodcast[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// List of search terms to get diverse podcasts
const SEARCH_TERMS = [
  "podcast",
  "technology podcast",
  "business podcast",
  "news podcast",
  "entertainment podcast",
  "education podcast",
  "science podcast",
  "health podcast",
  "sports podcast",
  "music podcast"
]

export function usePodcasts(): UsePodcastsResult {
  const [podcasts, setPodcasts] = useState<iTunesPodcast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPodcasts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("Fetching podcasts...")
      
      // Get random search term
      const randomIndex = Math.floor(Math.random() * SEARCH_TERMS.length)
      const searchTerm = SEARCH_TERMS[randomIndex]
      
      const response = await searchPodcasts(searchTerm)
      
      if (!response.results || response.results.length === 0) {
        throw new Error("No podcasts found")
      }

      // Shuffle the results to get random podcasts
      const shuffledResults = [...response.results].sort(() => Math.random() - 0.5)
      // Take only the first 6 podcasts
      const randomPodcasts = shuffledResults.slice(0, 6)

      console.log(`Found ${randomPodcasts.length} random podcasts`)
      setPodcasts(randomPodcasts)
    } catch (err) {
      console.error("Error fetching podcasts:", err)
      setError(err instanceof Error ? err.message : "Failed to load podcasts")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPodcasts()
  }, [fetchPodcasts])

  return {
    podcasts,
    loading,
    error,
    refetch: fetchPodcasts
  }
} 
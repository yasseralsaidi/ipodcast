import type { AppRouter } from "@/app/server/api/root"
import { api } from "@/app/trpc/react"
import type { TRPCClientErrorLike } from "@trpc/client"
import { useCallback } from "react"

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

// Utility function for consistent retry logic
export const createRetryConfig = (maxRetries = 3) => ({
  retry: (failureCount: number, error: TRPCClientErrorLike<AppRouter>) => {
    if (failureCount >= maxRetries) return false
    
    // Don't retry on 4xx errors (client errors)
    if (error.data?.httpStatus && error.data.httpStatus >= 400 && error.data.httpStatus < 500) {
      return false
    }
    
    // Retry on 5xx errors and network errors
    return true
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
})

export function usePodcasts() {
  const randomPodcastsQuery = api.podcast.getRandomPodcasts.useQuery(
    { limit: 8 },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      ...createRetryConfig(3),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    }
  )

  const refetch = useCallback(async () => {
    await randomPodcastsQuery.refetch()
  }, [randomPodcastsQuery])

  return {
    podcasts: randomPodcastsQuery.data || [],
    loading: randomPodcastsQuery.isLoading,
    error: randomPodcastsQuery.error?.message || null,
    refetch,
    isRefetching: randomPodcastsQuery.isRefetching,
  }
} 
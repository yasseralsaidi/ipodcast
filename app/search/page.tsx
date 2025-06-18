"use client"

import { api } from "@/app/trpc/react"
import { EpisodeList } from "@/components/episode-list"
import { Header } from "@/components/header"
import { PodcastCard } from "@/components/podcast-card"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { createRetryConfig } from "@/hooks/use-podcasts"
import type { PodcastResult } from "@/lib/types"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchPage() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q")

  const searchMutation = api.podcast.search.useMutation({
    ...createRetryConfig(2),
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 10000),
  })

  const searchHistoryQuery = api.podcast.getRecentSearches.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...createRetryConfig(2),
  })

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  const handleSearch = async (searchTerm: string) => {
    setCurrentSearchTerm(searchTerm)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    await searchMutation.mutateAsync({ term: searchTerm })
  }

  const handleRetry = () => {
    if (currentSearchTerm) {
      searchMutation.mutate({ term: currentSearchTerm })
    }
  }

  const isLoading = searchMutation.isPending
  const error = searchMutation.error
  const results = searchMutation.data?.data as PodcastResult[] || []

  // Split results into podcasts (first 5) and episodes (rest)
  const topPodcasts = results.slice(0, 5)
  const episodes = results.slice(5)

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Sidebar />
      <Header onSearch={handleSearch} searchTerm={currentSearchTerm} />

      <main className="ml-64 pt-16">
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-8">
              {/* Loading skeleton for top podcasts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-7 rounded w-48 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded animate-pulse" />
                    <div className="w-8 h-8 rounded animate-pulse" />
                    <div className="w-8 h-8 rounded animate-pulse" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`skeleton-podcast-${i}-${Date.now()}`} className="space-y-3">
                      <div className="aspect-square rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 rounded animate-pulse" />
                        <div className="h-3 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <div>
                  <p className="text-destructive text-lg font-semibold mb-2">
                    {error.message || "Failed to fetch data from iTunes API"}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Please check your internet connection and try again.
                  </p>
                  <Button 
                    onClick={handleRetry}
                    disabled={searchMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {searchMutation.isPending ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">
                {currentSearchTerm ? `لم يتم العثور على بودكاست لـ "${currentSearchTerm}"` : "ابدأ البحث عن البودكاست"}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Top Podcasts Section */}
              {topPodcasts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">أفضل البودكاست لـ {currentSearchTerm}</h2>
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {topPodcasts.map((podcast) => (
                      <PodcastCard key={podcast.id} podcast={podcast} />
                    ))}
                  </div>
                </section>
              )}

              {/* Episodes Section */}
              {episodes.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">الحلقات</h2>
                  </div>
                  <EpisodeList episodes={episodes} />
                </section>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-border mt-16 py-6 px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span>iPodcast v0.1 بواسطة ياسر السعيدي.</span>
              <a href="/about" className="hover:text-primary transition-colors">
                من نحن
              </a>
              <a href="/podcasts" className="hover:text-primary transition-colors">
                جميع البودكاست
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

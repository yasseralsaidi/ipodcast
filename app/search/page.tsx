"use client"

import { api } from "@/app/trpc/react"
import { EpisodeList } from "@/components/episode-list"
import { Header } from "@/components/header"
import { PodcastCard } from "@/components/podcast-card"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { createRetryConfig } from "@/hooks/use-podcasts"
import type { PodcastResult } from "@/lib/types"
import { AlertCircle, RefreshCw, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchPage() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
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
    setHasSearched(true)
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

  // Show loading skeleton when searching or initial load
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen text-foreground">
        <Sidebar />
        <Header onSearch={handleSearch} searchTerm={currentSearchTerm} />

        <main className="ml-64 pt-16">
          <div className="p-6">
            <div className="space-y-8">
              {/* Loading skeleton for top podcasts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-7 bg-muted rounded w-48 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                    <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                    <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`skeleton-podcast-${i}-${Math.random()}`} className="space-y-3">
                      <div className="aspect-square bg-muted rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loading skeleton for episodes */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-7 bg-muted rounded w-32 animate-pulse" />
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`skeleton-episode-${i}-${Math.random()}`} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Sidebar />
      <Header onSearch={handleSearch} searchTerm={currentSearchTerm} />

      <main className="ml-64 pt-16">
        <div className="p-6">
          {error ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <div>
                  <p className="text-destructive text-lg font-semibold mb-2">
                    {error.message || "Failed to fetch data from iTunes API"}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    يرجى التحقق من اتصالك بالانترنت والمحاولة مرة أخرى.
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
                    حاول مرة أخرى
                  </Button>
                </div>
              </div>
            </div>
          ) : hasSearched && results.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Search className="w-16 h-16 text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    لم يتم العثور على نتائج
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    لم نتمكن من العثور على أي بودكاست أو حلقة لـ "{currentSearchTerm}"
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p>جرب:</p>
                    <ul className="mt-2 space-y-1">
                      <li>• استخدام كلمات مختلفة</li>
                      <li>• التأكد من صحة الإملاء</li>
                      <li>• استخدام كلمات أكثر عمومية</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : !hasSearched ? (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Search className="w-16 h-16 text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    ابدأ البحث عن البودكاست
                  </h3>
                  <p className="text-muted-foreground">
                    استخدم شريط البحث أعلاه للعثور على البودكاست والحلقات المفضلة لديك
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Top Podcasts Section */}
              {topPodcasts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">نتائج البحث لـ "{currentSearchTerm}"</h2>
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
      </main>
    </div>
  )
}

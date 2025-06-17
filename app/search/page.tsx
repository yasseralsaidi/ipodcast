"use client"

import { api } from "@/app/trpc/react"
import { EpisodeList } from "@/components/episode-list"
import { Header } from "@/components/header"
import { PodcastCard } from "@/components/podcast-card"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import type { PodcastResult } from "@/lib/types"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchPage() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<PodcastResult[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q")

  const searchQuery = api.podcast.search.useMutation({
    onSuccess: (data) => {
      setSearchResults(data.data.map(result => ({
        ...result,
        createdAt: new Date(result.createdAt).toISOString()
      })))
    }
  })

  const searchHistoryQuery = api.podcast.getRecentSearches.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  const handleSearch = async (searchTerm: string) => {
    setCurrentSearchTerm(searchTerm)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    await searchQuery.mutateAsync({ term: searchTerm })
  }

  const isLoading = searchQuery.isPending
  const error = searchQuery.error
  const results = searchResults

  // Split results into podcasts (first 5) and episodes (rest)
  const topPodcasts = results.slice(0, 5)
  const episodes = results.slice(5)

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <Header onSearch={handleSearch} searchTerm={currentSearchTerm} />

      <main className="ml-64 pt-16">
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-8">
              {/* Loading skeleton for top podcasts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="h-7 bg-gray-800 rounded w-48 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-gray-800 rounded animate-pulse" />
                    <div className="w-8 h-8 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`skeleton-podcast-${i}-${Date.now()}`} className="space-y-3">
                      <div className="aspect-square bg-gray-800 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-800 rounded animate-pulse" />
                        <div className="h-3 bg-gray-800 rounded w-2/3 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg">{error.message}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {currentSearchTerm ? `No podcasts found for "${currentSearchTerm}"` : "Start searching for podcasts"}
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Top Podcasts Section */}
              {topPodcasts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Top podcasts for {currentSearchTerm}</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {topPodcasts.map((podcast) => (
                      <PodcastCard key={podcast.id} podcast={podcast} />
                    ))}
                  </div>
                </section>
              )}

              {/* Advertisement Banner Placeholder */}
              <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold mb-2">امنح فكرتك اسم نطاق</h3>
                <p className="text-blue-100 mb-4">ابتداء اسم نطاق فريد من نوعه</p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100">معلومات أكثر</Button>
              </div>

              {/* Top Episodes Section */}
              {episodes.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Top episodes for {currentSearchTerm}</h2>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                  <EpisodeList episodes={episodes} />
                </section>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-16 py-6 px-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>iPodcast v0.1 by Yasser Alsaidi.</span>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/podcasts" className="hover:text-white transition-colors">
                All Podcasts
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

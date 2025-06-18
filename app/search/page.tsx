"use client"

import { api } from "@/app/trpc/react"
import { EpisodeList } from "@/components/episode-list"
import { PodcastCard } from "@/components/podcast-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { createRetryConfig } from "@/hooks/use-podcasts"
import type { PodcastResult } from "@/lib/types"
import { AlertCircle, RefreshCw, Search, Sparkles, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
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
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Enhanced Loading Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full" />
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Search className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                    جاري البحث...
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">البحث في قاعدة البيانات</span>
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loading skeleton for top podcasts */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">البودكاست</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={`skeleton-podcast-${i}-${Math.random().toString(36).substr(2, 9)}`} className="group h-full border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <CardHeader className="p-4 lg:p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="p-4 lg:p-6 pt-0">
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Loading skeleton for episodes */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">الحلقات</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={`skeleton-episode-${i}-${Math.random().toString(36).substr(2, 9)}`} className="p-4 border-2 border-border/50 bg-background/80 backdrop-blur-sm">
                  <div className="flex gap-4">
                    <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 lg:py-16"
          >
            <Card className="max-w-md mx-auto border-2 border-destructive/20 bg-destructive/5">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-destructive text-xl font-semibold mb-2">
                  {error.message || "فشل في جلب البيانات"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  يرجى التحقق من اتصالك بالانترنت والمحاولة مرة أخرى.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  onClick={handleRetry}
                  disabled={searchMutation.isPending}
                  className="flex items-center gap-2 mx-auto"
                >
                  {searchMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  حاول مرة أخرى
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : hasSearched && results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 lg:py-16"
          >
            <Card className="max-w-lg mx-auto border-2 border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  لم يتم العثور على نتائج
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  لم نتمكن من العثور على أي بودكاست أو حلقة لـ "{currentSearchTerm}"
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4">
                  <p className="font-medium mb-2">جرب:</p>
                  <ul className="space-y-1 text-right">
                    <li>• استخدام كلمات مختلفة</li>
                    <li>• التأكد من صحة الإملاء</li>
                    <li>• استخدام كلمات أكثر عمومية</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : !hasSearched ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 lg:py-16"
          >
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full" />
                <div className="relative">
                  <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    ابدأ البحث عن البودكاست
                  </h1>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">اكتشف عوالم جديدة من الصوت</span>
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                استخدم شريط البحث أعلاه للعثور على البودكاست والحلقات المفضلة لديك
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 lg:space-y-12"
          >
            {/* Enhanced Header with Results */}
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Search className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                      نتائج البحث
                    </h1>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {results.length} نتيجة لـ "{currentSearchTerm}"
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Podcasts Section */}
            {topPodcasts.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">البودكاست</h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {topPodcasts.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                  ))}
                </div>
              </section>
            )}

            {/* Episodes Section */}
            {episodes.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">الحلقات</h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <EpisodeList episodes={episodes} />
              </section>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

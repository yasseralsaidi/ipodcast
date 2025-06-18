"use client"

import { api } from "@/app/trpc/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createRetryConfig } from "@/hooks/use-podcasts"
import { AlertCircle, Heart, Play, RefreshCw, Share2 } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useCallback } from "react"

export default function PodcastDetails() {
  const params = useParams()
  const podcastId = Number(params.id)

  const podcastQuery = api.podcast.getPodcastById.useQuery(
    { collectionId: podcastId },
    {
      enabled: !!podcastId,
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      ...createRetryConfig(3),
    }
  )

  const handleRetry = useCallback(() => {
    podcastQuery.refetch()
  }, [podcastQuery])

  const podcast = podcastQuery.data
  const loading = podcastQuery.isLoading
  const error = podcastQuery.error

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <h1 className="text-2xl font-bold">جاري التحميل...</h1>
        </div>
      </div>
    )
  }

  if (error || !podcast) {
    return (
      <div className="container py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-destructive" />
          <div>
            <h1 className="text-2xl font-bold text-destructive mb-2">
              {error?.message || "البودكاست غير موجود"}
            </h1>
            <p className="text-muted-foreground mb-4">
              {error ? "حدث خطأ أثناء تحميل بيانات البودكاست" : "لم يتم العثور على البودكاست المطلوب"}
            </p>
            <Button 
              onClick={handleRetry}
              disabled={podcastQuery.isRefetching}
              className="flex items-center gap-2"
            >
              {podcastQuery.isRefetching ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              حاول مرة أخرى
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Podcast Artwork */}
          <div className="md:col-span-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={podcast.artworkUrl600 || podcast.artworkUrl100 || "/placeholder.svg"}
                alt={podcast.collectionName || podcast.trackName}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Podcast Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {podcast.collectionName || podcast.trackName}
              </h1>
              <p className="text-xl text-muted-foreground">
                {podcast.artistName}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => window.open(podcast.collectionViewUrl, '_blank')}
              >
                <Play className="w-4 h-4" />
                استمع الآن
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                إضافة للمفضلة
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex items-center gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: podcast.collectionName || podcast.trackName,
                      text: `Check out ${podcast.collectionName || podcast.trackName} by ${podcast.artistName}`,
                      url: podcast.collectionViewUrl,
                    })
                  } else {
                    navigator.clipboard.writeText(podcast.collectionViewUrl)
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                مشاركة
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold">النوع</p>
                <p className="text-muted-foreground">{podcast.primaryGenreName}</p>
              </div>
              <div>
                <p className="font-semibold">عدد الحلقات</p>
                <p className="text-muted-foreground">{podcast.trackCount}</p>
              </div>
              <div>
                <p className="font-semibold">السعر</p>
                <p className="text-muted-foreground">
                  {(podcast.collectionPrice ?? 0) > 0 ? `$${podcast.collectionPrice}` : "مجاني"}
                </p>
              </div>
              <div>
                <p className="font-semibold">تاريخ الإصدار</p>
                <p className="text-muted-foreground">
                  {podcast.releaseDate ? new Date(podcast.releaseDate).toLocaleDateString('ar-SA') : "غير متوفر"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>معلومات البودكاست</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">النوع</h3>
                    <p className="text-muted-foreground">{podcast.primaryGenreName}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">عدد الحلقات</h3>
                    <p className="text-muted-foreground">{podcast.trackCount} حلقة</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">تاريخ الإصدار</h3>
                    <p className="text-muted-foreground">
                      {podcast.releaseDate ? new Date(podcast.releaseDate).toLocaleDateString('ar-SA') : "غير متوفر"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">الرابط</h3>
                    <a 
                      href={podcast.collectionViewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      استمع على Apple Podcasts
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
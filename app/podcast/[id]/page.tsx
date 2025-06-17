"use client"

import { type iTunesPodcast, searchPodcasts } from "@/app/server/services/itunes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Play, Share2 } from "lucide-react"
import { motion } from "motion/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PodcastDetails() {
  const params = useParams()
  const podcastId = Number(params.id)
  const [podcast, setPodcast] = useState<iTunesPodcast | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        // First, search for the podcast by ID
        const response = await searchPodcasts(podcastId.toString())
        const foundPodcast = response.results.find(p => p.collectionId === podcastId)
        
        if (foundPodcast) {
          setPodcast(foundPodcast)
        } else {
          setError("Podcast not found")
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to load podcast details")
        setLoading(false)
      }
    }

    fetchPodcast()
  }, [podcastId])

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">جاري التحميل...</h1>
      </div>
    )
  }

  if (error || !podcast) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">{error || "البودكاست غير موجود"}</h1>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Podcast Image and Info */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={podcast.artworkUrl600}
                  alt={podcast.collectionName}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{podcast.collectionName}</CardTitle>
                <CardDescription>{podcast.artistName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.open(podcast.collectionViewUrl, '_blank')}
                  >
                    <Play className="w-4 h-4 ml-2" />
                    استمع الآن
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(podcast.collectionViewUrl, '_blank')}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Podcast Details */}
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
                      {new Date(podcast.releaseDate).toLocaleDateString('ar-SA')}
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
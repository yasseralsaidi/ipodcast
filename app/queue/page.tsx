"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  Heart,
  MoreVertical,
  Music,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Star,
  Trash2,
  Users
} from "lucide-react"
import { useState } from "react"

interface QueueItem {
  id: string
  title: string
  podcast: string
  duration: string
  addedAt: string
  thumbnail: string
  rating?: number
  category?: string
  isFavorite?: boolean
}

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: "1",
      title: "الحلقة 1: مقدمة في التكنولوجيا",
      podcast: "بودكاست التكنولوجيا",
      duration: "45:30",
      addedAt: "منذ ساعتين",
      thumbnail: "/placeholder.jpg",
      rating: 4.8,
      category: "تكنولوجيا"
    },
    {
      id: "2", 
      title: "كيف تبني عادات إيجابية",
      podcast: "بودكاست التنمية الذاتية",
      duration: "32:15",
      addedAt: "منذ 3 ساعات",
      thumbnail: "/placeholder.jpg",
      rating: 4.9,
      category: "تنمية ذاتية",
      isFavorite: true
    },
    {
      id: "3",
      title: "تاريخ الإنترنت",
      podcast: "بودكاست التاريخ",
      duration: "58:42",
      addedAt: "منذ يوم",
      thumbnail: "/placeholder.jpg",
      rating: 4.7,
      category: "تاريخ"
    }
  ])

  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = (id: string) => {
    setCurrentPlaying(id)
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleRemoveFromQueue = (id: string) => {
    setQueueItems(queueItems.filter(item => item.id !== id))
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "ثقافة": "bg-secondary text-secondary-foreground",
      "تكنولوجيا": "bg-secondary text-secondary-foreground",
      "صحة": "bg-secondary text-secondary-foreground",
      "أعمال": "bg-secondary text-secondary-foreground",
      "تاريخ": "bg-secondary text-secondary-foreground",
      "علوم": "bg-secondary text-secondary-foreground",
      "تنمية ذاتية": "bg-secondary text-secondary-foreground"
    }
    return colors[category] || "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="bg-card rounded-3xl p-8 border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground">
                      قائمة الانتظار
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      {queueItems.length} حلقة في قائمة الانتظار
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{queueItems.length} عنصر</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>وقت إجمالي: 2:16:27</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="rounded-xl border-input hover:bg-accent hover:text-accent-foreground">
                  <Shuffle className="w-4 h-4 ml-2" />
                  عشوائي
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl border-input hover:bg-accent hover:text-accent-foreground">
                  <SkipBack className="w-4 h-4 ml-2" />
                  السابق
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl border-input hover:bg-accent hover:text-accent-foreground">
                  <SkipForward className="w-4 h-4 ml-2" />
                  التالي
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl border-input hover:bg-accent hover:text-accent-foreground">
                  <Repeat className="w-4 h-4 ml-2" />
                  تكرار
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Now Playing */}
        {currentPlaying && (
          <Card className="relative overflow-hidden border shadow-sm bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
            <CardHeader className="relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Play className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      جاري التشغيل
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {queueItems.find(item => item.id === currentPlaying)?.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {queueItems.find(item => item.id === currentPlaying)?.podcast}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={isPlaying ? handlePause : () => handlePlay(currentPlaying)}
                    className="w-12 h-12 rounded-xl border-input hover:bg-accent hover:text-accent-foreground"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Enhanced Queue List */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">قائمة الانتظار</h2>
              <Badge variant="outline" className="bg-muted">
                {queueItems.length} حلقة
              </Badge>
            </div>
          </div>
          
          <div className="p-6">
            {queueItems.length === 0 ? (
              <Card className="border-0 bg-muted/50">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">قائمة الانتظار فارغة</h3>
                  <p className="text-muted-foreground mb-6">أضف حلقات إلى قائمة الانتظار للاستماع إليها لاحقاً</p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                    استكشف البودكاست
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {queueItems.map((item, index) => (
                  <Card 
                    key={item.id} 
                    className={`group transition-all duration-300 border shadow-sm hover:shadow-md ${
                      currentPlaying === item.id 
                        ? 'ring-2 ring-primary/50 bg-primary/5' 
                        : 'hover:bg-card/80'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            currentPlaying === item.id 
                              ? 'bg-primary text-primary-foreground shadow-lg' 
                              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                          }`}>
                            <span className="text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-muted-foreground font-medium">{item.podcast}</p>
                              </div>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {item.duration}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {item.addedAt}
                              </div>
                              {item.category && (
                                <Badge className={`${getCategoryColor(item.category)} border text-xs`}>
                                  {item.category}
                                </Badge>
                              )}
                              {item.rating && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">{item.rating}</span>
                                </div>
                              )}
                              {item.isFavorite && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Heart className="w-3 h-3 fill-destructive text-destructive" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePlay(item.id)}
                            className="w-10 h-10 rounded-xl hover:bg-primary/20 hover:text-primary"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFromQueue(item.id)}
                            className="w-10 h-10 rounded-xl hover:bg-destructive/20 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
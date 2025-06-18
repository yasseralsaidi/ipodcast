"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Music, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Trash2 } from "lucide-react"
import { useState } from "react"

interface QueueItem {
  id: string
  title: string
  podcast: string
  duration: string
  addedAt: string
  thumbnail: string
}

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: "1",
      title: "الحلقة 1: مقدمة في التكنولوجيا",
      podcast: "بودكاست التكنولوجيا",
      duration: "45:30",
      addedAt: "منذ ساعتين",
      thumbnail: "/placeholder.jpg"
    },
    {
      id: "2", 
      title: "كيف تبني عادات إيجابية",
      podcast: "بودكاست التنمية الذاتية",
      duration: "32:15",
      addedAt: "منذ 3 ساعات",
      thumbnail: "/placeholder.jpg"
    },
    {
      id: "3",
      title: "تاريخ الإنترنت",
      podcast: "بودكاست التاريخ",
      duration: "58:42",
      addedAt: "منذ يوم",
      thumbnail: "/placeholder.jpg"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 rounded-3xl blur-3xl" />
          <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                    <Music className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      قائمة الانتظار
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      {queueItems.length} حلقة في قائمة الانتظار
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="rounded-full border-border/50 hover:bg-primary/10">
                  <Shuffle className="w-4 h-4 ml-2" />
                  عشوائي
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-border/50 hover:bg-primary/10">
                  <SkipBack className="w-4 h-4 ml-2" />
                  السابق
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-border/50 hover:bg-primary/10">
                  <SkipForward className="w-4 h-4 ml-2" />
                  التالي
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-border/50 hover:bg-primary/10">
                  <Repeat className="w-4 h-4 ml-2" />
                  تكرار
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Now Playing */}
        {currentPlaying && (
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <CardHeader className="relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-xl">
                    <Play className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
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
                    className="w-12 h-12 rounded-full border-primary/30 hover:bg-primary/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Enhanced Queue List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">قائمة الانتظار</h2>
            <Badge variant="outline" className="bg-background/50">
              {queueItems.length} حلقة
            </Badge>
          </div>
          
          {queueItems.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50 bg-card/30 backdrop-blur-sm">
              <CardContent className="text-center py-16">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-foreground">قائمة الانتظار فارغة</p>
                    <p className="text-muted-foreground">أضف حلقات إلى قائمة الانتظار للاستماع إليها لاحقاً</p>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    استكشف البودكاست
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {queueItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className={`group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-border/50 hover:border-primary/30 ${
                    currentPlaying === item.id 
                      ? 'ring-2 ring-primary/50 shadow-lg bg-primary/5' 
                      : 'hover:bg-card/80'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          currentPlaying === item.id 
                            ? 'bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-lg' 
                            : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                          <span className="text-sm font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-foreground text-lg leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground font-medium">{item.podcast}</p>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {item.duration}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {item.addedAt}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePlay(item.id)}
                          className="w-10 h-10 rounded-full hover:bg-primary/20 hover:text-primary"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromQueue(item.id)}
                          className="w-10 h-10 rounded-full hover:bg-destructive/20 hover:text-destructive"
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
  )
} 
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Pause, Play, SkipBack, SkipForward, Trash2 } from "lucide-react"
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">قائمة الانتظار</h1>
          <p className="text-muted-foreground">
            {queueItems.length} حلقة في قائمة الانتظار
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SkipBack className="w-4 h-4 ml-2" />
            السابق
          </Button>
          <Button variant="outline" size="sm">
            <SkipForward className="w-4 h-4 ml-2" />
            التالي
          </Button>
        </div>
      </div>

      {/* Now Playing */}
      {currentPlaying && (
        <Card className="bg-accent/50 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">جاري التشغيل</CardTitle>
                <CardDescription>
                  {queueItems.find(item => item.id === currentPlaying)?.title}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isPlaying ? handlePause : () => handlePlay(currentPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Queue List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">قائمة الانتظار</h2>
        {queueItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">قائمة الانتظار فارغة</p>
                <p className="text-sm">أضف حلقات إلى قائمة الانتظار للاستماع إليها لاحقاً</p>
              </div>
              <Button variant="outline">استكشف البودكاست</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {queueItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`transition-all hover:shadow-md ${
                  currentPlaying === item.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.podcast}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {item.addedAt}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePlay(item.id)}
                        className="h-8 w-8"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFromQueue(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
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
  )
} 
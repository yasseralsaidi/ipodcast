"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  History,
  Play,
  TrendingUp
} from "lucide-react"
import { useState } from "react"

interface RecentItem {
  id: string
  title: string
  podcast: string
  duration: string
  listenedAt: string
  progress: number // percentage listened
  thumbnail: string
  type: "episode" | "podcast"
}

export default function RecentsPage() {
  const [activeTab, setActiveTab] = useState("episodes")

  const recentEpisodes: RecentItem[] = [
    {
      id: "1",
      title: "الحلقة 15: مستقبل الذكاء الاصطناعي",
      podcast: "بودكاست التكنولوجيا",
      duration: "45:30",
      listenedAt: "منذ ساعتين",
      progress: 75,
      thumbnail: "/placeholder.jpg",
      type: "episode"
    },
    {
      id: "2",
      title: "كيف تبني عادات إيجابية",
      podcast: "بودكاست التنمية الذاتية",
      duration: "32:15",
      listenedAt: "منذ 3 ساعات",
      progress: 100,
      thumbnail: "/placeholder.jpg",
      type: "episode"
    },
    {
      id: "3",
      title: "تاريخ الإنترنت - الجزء الثاني",
      podcast: "بودكاست التاريخ",
      duration: "58:42",
      listenedAt: "منذ يوم",
      progress: 45,
      thumbnail: "/placeholder.jpg",
      type: "episode"
    },
    {
      id: "4",
      title: "محادثة مع رجل الأعمال أحمد محمد",
      podcast: "فنجان",
      duration: "1:23:15",
      listenedAt: "منذ يومين",
      progress: 90,
      thumbnail: "/placeholder.jpg",
      type: "episode"
    }
  ]

  const recentPodcasts: RecentItem[] = [
    {
      id: "1",
      title: "فنجان",
      podcast: "أحمد الشقيري",
      duration: "150 حلقة",
      listenedAt: "منذ ساعة",
      progress: 0,
      thumbnail: "/placeholder.jpg",
      type: "podcast"
    },
    {
      id: "2",
      title: "بودكاست التكنولوجيا",
      podcast: "محمد أحمد",
      duration: "89 حلقة",
      listenedAt: "منذ 3 ساعات",
      progress: 0,
      thumbnail: "/placeholder.jpg",
      type: "podcast"
    },
    {
      id: "3",
      title: "بودكاست الصحة",
      podcast: "د. سارة محمد",
      duration: "120 حلقة",
      listenedAt: "منذ يوم",
      progress: 0,
      thumbnail: "/placeholder.jpg",
      type: "podcast"
    }
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-primary"
  }

  const formatProgress = (progress: number) => {
    if (progress === 0) return "لم تبدأ"
    if (progress === 100) return "مكتمل"
    return `${progress}%`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">الأخيرة</h1>
          <p className="text-muted-foreground">
            الحلقات والبودكاستات التي استمعت إليها مؤخراً
          </p>
        </div>
        <Button variant="outline">
          <History className="w-4 h-4 ml-2" />
          مسح السجل
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">إجمالي وقت الاستماع</p>
                <p className="text-2xl font-bold">12.5 ساعة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الحلقات المستمع إليها</p>
                <p className="text-2xl font-bold">24 حلقة</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">البودكاستات المتابعة</p>
                <p className="text-2xl font-bold">8 بودكاست</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="episodes">الحلقات الأخيرة ({recentEpisodes.length})</TabsTrigger>
          <TabsTrigger value="podcasts">البودكاستات الأخيرة ({recentPodcasts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="episodes" className="space-y-4">
          {recentEpisodes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <History className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">لا توجد حلقات حديثة</p>
                  <p className="text-sm">ابدأ بالاستماع إلى بعض الحلقات</p>
                </div>
                <Button variant="outline">استكشف البودكاست</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {recentEpisodes.map((episode) => (
                <Card key={episode.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{episode.title}</h3>
                        <p className="text-sm text-muted-foreground">{episode.podcast}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {episode.duration}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {episode.listenedAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatProgress(episode.progress)}</div>
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColor(episode.progress)} transition-all duration-300`}
                              style={{ width: `${episode.progress}%` }}
                            />
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 ml-1" />
                          {episode.progress === 100 ? "إعادة" : "متابعة"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="podcasts" className="space-y-4">
          {recentPodcasts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <History className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">لا توجد بودكاستات حديثة</p>
                  <p className="text-sm">ابدأ بالاستماع إلى بعض البودكاستات</p>
                </div>
                <Button variant="outline">استكشف البودكاست</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPodcasts.map((podcast) => (
                <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{podcast.title}</CardTitle>
                        <CardDescription className="mt-1">{podcast.podcast}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{podcast.duration}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {podcast.listenedAt}
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 ml-1" />
                        استمع
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 
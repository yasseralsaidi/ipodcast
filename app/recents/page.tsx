"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Heart,
  History,
  MoreVertical,
  Play,
  Star,
  TrendingUp,
  Users
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
  rating?: number
  category?: string
  isFavorite?: boolean
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
      type: "episode",
      rating: 4.8,
      category: "تكنولوجيا"
    },
    {
      id: "2",
      title: "كيف تبني عادات إيجابية",
      podcast: "بودكاست التنمية الذاتية",
      duration: "32:15",
      listenedAt: "منذ 3 ساعات",
      progress: 100,
      thumbnail: "/placeholder.jpg",
      type: "episode",
      rating: 4.9,
      category: "تنمية ذاتية",
      isFavorite: true
    },
    {
      id: "3",
      title: "تاريخ الإنترنت - الجزء الثاني",
      podcast: "بودكاست التاريخ",
      duration: "58:42",
      listenedAt: "منذ يوم",
      progress: 45,
      thumbnail: "/placeholder.jpg",
      type: "episode",
      rating: 4.7,
      category: "تاريخ"
    },
    {
      id: "4",
      title: "محادثة مع رجل الأعمال أحمد محمد",
      podcast: "فنجان",
      duration: "1:23:15",
      listenedAt: "منذ يومين",
      progress: 90,
      thumbnail: "/placeholder.jpg",
      type: "episode",
      rating: 4.9,
      category: "ثقافة"
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
      type: "podcast",
      rating: 4.9,
      category: "ثقافة",
      isFavorite: true
    },
    {
      id: "2",
      title: "بودكاست التكنولوجيا",
      podcast: "محمد أحمد",
      duration: "89 حلقة",
      listenedAt: "منذ 3 ساعات",
      progress: 0,
      thumbnail: "/placeholder.jpg",
      type: "podcast",
      rating: 4.5,
      category: "تكنولوجيا"
    },
    {
      id: "3",
      title: "بودكاست الصحة",
      podcast: "د. سارة محمد",
      duration: "120 حلقة",
      listenedAt: "منذ يوم",
      progress: 0,
      thumbnail: "/placeholder.jpg",
      type: "podcast",
      rating: 4.7,
      category: "صحة"
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
                    <History className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground">
                      الأخيرة
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      الحلقات والبودكاستات التي استمعت إليها مؤخراً
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recentEpisodes.length + recentPodcasts.length} عنصر</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>نشاط حديث</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="rounded-2xl px-6 py-3 border-input hover:bg-accent hover:text-accent-foreground">
                <History className="w-5 h-5 ml-2" />
                مسح السجل
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">إجمالي وقت الاستماع</p>
                  <p className="text-2xl font-bold text-foreground">12.5 ساعة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">الحلقات المستمع إليها</p>
                  <p className="text-2xl font-bold text-foreground">24 حلقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">البودكاستات المتابعة</p>
                  <p className="text-2xl font-bold text-foreground">8 بودكاست</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-6 border-b border-border">
              <TabsList className="grid w-full grid-cols-2 bg-muted rounded-xl p-1">
                <TabsTrigger 
                  value="episodes" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  الحلقات الأخيرة ({recentEpisodes.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="podcasts" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  البودكاستات الأخيرة ({recentPodcasts.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="episodes" className="space-y-6 mt-0">
                {recentEpisodes.length === 0 ? (
                  <Card className="border-0 bg-muted/50">
                    <CardContent className="text-center py-16">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <History className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد حلقات حديثة</h3>
                      <p className="text-muted-foreground mb-6">ابدأ بالاستماع إلى بعض الحلقات</p>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                        استكشف البودكاست
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {recentEpisodes.map((episode) => (
                      <Card key={episode.id} className="group transition-all duration-300 border shadow-sm hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Play className="w-8 h-8 text-muted-foreground" />
                              </div>
                              {episode.isFavorite && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                                  <Heart className="w-3 h-3 text-destructive-foreground fill-destructive-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {episode.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground font-medium">{episode.podcast}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {episode.duration}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {episode.listenedAt}
                                </div>
                                {episode.category && (
                                  <Badge className={`${getCategoryColor(episode.category)} border text-xs`}>
                                    {episode.category}
                                  </Badge>
                                )}
                                {episode.rating && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{episode.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-sm font-medium text-foreground">{formatProgress(episode.progress)}</div>
                                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${getProgressColor(episode.progress)} transition-all duration-300`}
                                    style={{ width: `${episode.progress}%` }}
                                  />
                                </div>
                              </div>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2">
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

              <TabsContent value="podcasts" className="space-y-6 mt-0">
                {recentPodcasts.length === 0 ? (
                  <Card className="border-0 bg-muted/50">
                    <CardContent className="text-center py-16">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <History className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد بودكاستات حديثة</h3>
                      <p className="text-muted-foreground mb-6">ابدأ بالاستماع إلى بعض البودكاستات</p>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                        استكشف البودكاست
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentPodcasts.map((podcast) => (
                      <Card key={podcast.id} className="group transition-all duration-300 border shadow-sm hover:shadow-md">
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <Play className="w-10 h-10 text-muted-foreground" />
                              </div>
                              {podcast.isFavorite && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                                  <Heart className="w-4 h-4 text-destructive-foreground fill-destructive-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {podcast.title}
                              </CardTitle>
                              <CardDescription className="mt-1 text-muted-foreground font-medium">
                                {podcast.podcast}
                              </CardDescription>
                              <div className="flex items-center gap-2 mt-3">
                                {podcast.category && (
                                  <Badge className={`${getCategoryColor(podcast.category)} border font-medium`}>
                                    {podcast.category}
                                  </Badge>
                                )}
                                {podcast.rating && (
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{podcast.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{podcast.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">{podcast.listenedAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                              آخر استماع: {podcast.listenedAt}
                            </span>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2">
                              <Play className="w-4 h-4 ml-1" />
                              استمع
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Download,
  Filter,
  Grid3X3,
  Heart,
  List,
  MoreVertical,
  Play,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users
} from "lucide-react"
import { useState } from "react"

interface Podcast {
  id: string
  title: string
  author: string
  description: string
  episodes: number
  lastEpisode: string
  rating: number
  listeners: string
  thumbnail: string
  category: string
  isFavorite?: boolean
  isDownloaded?: boolean
}

export default function PodcastsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("subscribed")

  const subscribedPodcasts: Podcast[] = [
    {
      id: "1",
      title: "فنجان",
      author: "أحمد الشقيري",
      description: "بودكاست يقدم محادثات عميقة مع شخصيات مؤثرة في المجتمع العربي",
      episodes: 150,
      lastEpisode: "منذ يومين",
      rating: 4.8,
      listeners: "50K+",
      thumbnail: "/placeholder.jpg",
      category: "ثقافة",
      isFavorite: true
    },
    {
      id: "2",
      title: "بودكاست التكنولوجيا",
      author: "محمد أحمد",
      description: "أحدث الأخبار والتطورات في عالم التكنولوجيا",
      episodes: 89,
      lastEpisode: "منذ أسبوع",
      rating: 4.5,
      listeners: "25K+",
      thumbnail: "/placeholder.jpg",
      category: "تكنولوجيا",
      isDownloaded: true
    },
    {
      id: "3",
      title: "بودكاست الصحة",
      author: "د. سارة محمد",
      description: "نصائح وإرشادات صحية من خبراء الطب",
      episodes: 120,
      lastEpisode: "منذ 3 أيام",
      rating: 4.7,
      listeners: "35K+",
      thumbnail: "/placeholder.jpg",
      category: "صحة"
    },
    {
      id: "4",
      title: "بودكاست الأعمال",
      author: "علي حسن",
      description: "استراتيجيات النجاح في عالم الأعمال والاستثمار",
      episodes: 75,
      lastEpisode: "منذ 5 أيام",
      rating: 4.6,
      listeners: "30K+",
      thumbnail: "/placeholder.jpg",
      category: "أعمال"
    },
    {
      id: "5",
      title: "بودكاست التاريخ",
      author: "د. فاطمة علي",
      description: "قصص وحقائق تاريخية من مختلف العصور والحضارات",
      episodes: 95,
      lastEpisode: "منذ أسبوع",
      rating: 4.9,
      listeners: "40K+",
      thumbnail: "/placeholder.jpg",
      category: "تاريخ"
    },
    {
      id: "6",
      title: "بودكاست العلوم",
      author: "د. عمر خالد",
      description: "اكتشافات علمية حديثة وتفسيرات مبسطة للظواهر الطبيعية",
      episodes: 110,
      lastEpisode: "منذ يومين",
      rating: 4.4,
      listeners: "20K+",
      thumbnail: "/placeholder.jpg",
      category: "علوم"
    }
  ]

  const filteredPodcasts = subscribedPodcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "ثقافة": "bg-secondary text-secondary-foreground",
      "تكنولوجيا": "bg-secondary text-secondary-foreground",
      "صحة": "bg-secondary text-secondary-foreground",
      "أعمال": "bg-secondary text-secondary-foreground",
      "تاريخ": "bg-secondary text-secondary-foreground",
      "علوم": "bg-secondary text-secondary-foreground"
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
                    <Play className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-foreground">
                      بودكاستاتي
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      إدارة البودكاستات المشترك فيها
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{subscribedPodcasts.length} بودكاست</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>مشاهدات عالية</span>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl px-6 py-3">
                <Plus className="w-5 h-5 ml-2" />
                إضافة بودكاست
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-card rounded-2xl p-6 border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث في بودكاستاتك..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-12 rounded-xl border-input bg-background focus:ring-2 focus:ring-ring focus:ring-offset-0"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-input hover:bg-accent hover:text-accent-foreground">
              <Filter className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={`h-10 w-10 rounded-lg ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-sm" : ""}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={`h-10 w-10 rounded-lg ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-sm" : ""}`}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-6 border-b border-border">
              <TabsList className="grid w-full grid-cols-3 bg-muted rounded-xl p-1">
                <TabsTrigger 
                  value="subscribed" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  المشترك فيها ({subscribedPodcasts.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="downloaded" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  المحمولة
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  المفضلة
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="subscribed" className="space-y-6 mt-0">
                {filteredPodcasts.length === 0 ? (
                  <Card className="border-0 bg-muted/50">
                    <CardContent className="text-center py-16">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد بودكاستات</h3>
                      <p className="text-muted-foreground mb-6">ابدأ بالاشتراك في بعض البودكاستات المميزة</p>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                        استكشف البودكاست
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                    {filteredPodcasts.map((podcast) => (
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
                              {podcast.isDownloaded && (
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                  <Download className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {podcast.title}
                              </CardTitle>
                              <CardDescription className="mt-1 text-muted-foreground font-medium">
                                {podcast.author}
                              </CardDescription>
                              <div className="flex items-center gap-2 mt-3">
                                <Badge className={`${getCategoryColor(podcast.category)} border font-medium`}>
                                  {podcast.category}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">{podcast.rating}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                            {podcast.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{podcast.episodes} حلقات</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span className="font-medium">{podcast.listeners}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                              آخر حلقة: {podcast.lastEpisode}
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

              <TabsContent value="downloaded" className="space-y-6 mt-0">
                <Card className="border-0 bg-muted/50">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Download className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد حلقات محملة</h3>
                    <p className="text-muted-foreground mb-6">حمل الحلقات للاستماع إليها بدون إنترنت</p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                      تصفح الحلقات
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="space-y-6 mt-0">
                <Card className="border-0 bg-muted/50">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">لا توجد بودكاستات مفضلة</h3>
                    <p className="text-muted-foreground mb-6">أضف البودكاستات المفضلة لديك</p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3">
                      استكشف البودكاست
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 
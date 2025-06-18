"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Calendar,
    Clock,
    Filter,
    Grid3X3,
    List,
    Play,
    Plus,
    Search,
    Star,
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
      category: "ثقافة"
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
      category: "تكنولوجيا"
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
    }
  ]

  const filteredPodcasts = subscribedPodcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">بودكاستاتي</h1>
          <p className="text-muted-foreground">
            إدارة البودكاستات المشترك فيها
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة بودكاست
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="ابحث في بودكاستاتك..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
            className="h-8 w-8"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="subscribed">المشترك فيها ({subscribedPodcasts.length})</TabsTrigger>
          <TabsTrigger value="downloaded">المحمولة</TabsTrigger>
          <TabsTrigger value="favorites">المفضلة</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribed" className="space-y-6">
          {filteredPodcasts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">لا توجد بودكاستات</p>
                  <p className="text-sm">ابدأ بالاشتراك في بعض البودكاستات</p>
                </div>
                <Button variant="outline">استكشف البودكاست</Button>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredPodcasts.map((podcast) => (
                <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Play className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{podcast.title}</CardTitle>
                        <CardDescription className="mt-1">{podcast.author}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{podcast.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {podcast.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {podcast.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {podcast.episodes} حلقات
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {podcast.listeners}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">
                        آخر حلقة: {podcast.lastEpisode}
                      </span>
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

        <TabsContent value="downloaded" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">لا توجد حلقات محملة</p>
                <p className="text-sm">حمل الحلقات للاستماع إليها بدون إنترنت</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Star className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">لا توجد بودكاستات مفضلة</p>
                <p className="text-sm">أضف البودكاستات المفضلة لديك</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
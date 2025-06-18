"use client"

import { PodcastSection } from "@/components/podcast-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, TrendingUp, Users } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 lg:mb-4">استكشاف البودكاست</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto px-4">
          اكتشف بودكاستات جديدة ومثيرة من مختلف الفئات والمواضيع
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">الفئات الشائعة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
          {[
            "تكنولوجيا", "أعمال", "صحة", "تعليم", "ترفيه", "رياضة",
            "سياسة", "تاريخ", "علوم", "فنون", "سفر", "طبخ"
          ].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="h-16 lg:h-20 flex flex-col items-center justify-center gap-1 lg:gap-2 hover:bg-accent text-xs lg:text-sm"
            >
              <span className="font-medium">{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          <h2 className="text-xl lg:text-2xl font-semibold text-foreground">رائج الآن</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[
            {
              title: "فنجان",
              description: "بودكاست يقدم محادثات عميقة مع شخصيات مؤثرة",
              category: "ثقافة",
              rating: 4.8,
              listeners: "50K+"
            },
            {
              title: "سيريال",
              description: "قصص حقيقية من الحياة الأمريكية",
              category: "قصص",
              rating: 4.9,
              listeners: "100K+"
            },
            {
              title: "راديولاب",
              description: "استكشاف العلوم والتكنولوجيا",
              category: "علوم",
              rating: 4.7,
              listeners: "75K+"
            }
          ].map((podcast) => (
            <Card key={podcast.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 lg:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base lg:text-lg line-clamp-1">{podcast.title}</CardTitle>
                    <CardDescription className="mt-2 text-sm line-clamp-2">{podcast.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0 mr-2 lg:mr-0">{
                    podcast.category
                  }</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 lg:p-6 pt-0">
                <div className="flex items-center justify-between text-xs lg:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                    <span>{podcast.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{podcast.listeners}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Podcasts */}
      <PodcastSection />
    </div>
  )
} 
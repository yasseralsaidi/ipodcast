"use client"

import { PodcastSection } from "@/components/podcast-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, TrendingUp, Users } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">استكشاف البودكاست</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اكتشف بودكاستات جديدة ومثيرة من مختلف الفئات والمواضيع
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">الفئات الشائعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "تكنولوجيا", "أعمال", "صحة", "تعليم", "ترفيه", "رياضة",
            "سياسة", "تاريخ", "علوم", "فنون", "سفر", "طبخ"
          ].map((category) => (
            <Button
              key={category}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-accent"
            >
              <span className="text-sm font-medium">{category}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">رائج الآن</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{podcast.title}</CardTitle>
                    <CardDescription className="mt-2">{podcast.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{podcast.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{podcast.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
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
"use client"

import { PodcastSection } from "@/components/podcast-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Headphones, Mic, Sparkles, Star, TrendingUp, Users } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 lg:space-y-12 max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl rounded-full" />
            <div className="relative">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                استكشاف البودكاست
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">اكتشف عوالم جديدة من الصوت</span>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            اكتشف بودكاستات جديدة ومثيرة من مختلف الفئات والمواضيع، 
            واغرق في عالم من القصص والمعرفة المذهلة
          </p>
        </div>

        {/* Enhanced Categories */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">الفئات الشائعة</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "تكنولوجيا", icon: "💻" },
              { name: "أعمال", icon: "💼" },
              { name: "صحة", icon: "🏥" },
              { name: "تعليم", icon: "📚" },
              { name: "ترفيه", icon: "🎭" },
              { name: "رياضة", icon: "⚽" },
              { name: "سياسة", icon: "🏛️" },
              { name: "تاريخ", icon: "📜" },
              { name: "علوم", icon: "🔬" },
              { name: "فنون", icon: "🎨" },
              { name: "سفر", icon: "✈️" },
              { name: "طبخ", icon: "👨‍🍳" }
            ].map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="h-20 lg:h-24 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs lg:text-sm font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Trending Now */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">رائج الآن</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "فنجان",
                description: "بودكاست يقدم محادثات عميقة مع شخصيات مؤثرة في المجتمع العربي",
                category: "ثقافة",
                rating: 4.8,
                listeners: "50K+",
                icon: "☕"
              },
              {
                title: "سيريال",
                description: "قصص حقيقية من الحياة الأمريكية تثير الفضول والتأمل",
                category: "قصص",
                rating: 4.9,
                listeners: "100K+",
                icon: "📖"
              },
              {
                title: "راديولاب",
                description: "استكشاف العلوم والتكنولوجيا بطريقة ممتعة ومفهومة",
                category: "علوم",
                rating: 4.7,
                listeners: "75K+",
                icon: "🔬"
              }
            ].map((podcast, index) => (
              <Card 
                key={podcast.title} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                          {podcast.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg lg:text-xl line-clamp-1 group-hover:text-primary transition-colors">
                            {podcast.title}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {podcast.category}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed line-clamp-2">
                        {podcast.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">{podcast.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{podcast.listeners}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      <Headphones className="w-4 h-4 ml-2" />
                      استمع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Featured Podcasts */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">بودكاستات مميزة</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <PodcastSection />
        </div>
      </div>
    </div>
  )
} 
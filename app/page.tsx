"use client"

import { PodcastSection } from "@/components/podcast-section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Headphones, Mic, Play, Search, Sparkles, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HomePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim())
    }
  }

  const popularSearches = [
    { term: "فنجان", category: "تكنولوجيا", icon: TrendingUp },
    { term: "سايوير", category: "تطوير الذات", icon: Sparkles },
    { term: "أشياء غيرتنا", category: "ثقافة", icon: Headphones },
    { term: "الفجر", category: "إسلامي", icon: Play },
    { term: "بدون ورق", category: "تعليم", icon: TrendingUp },
    { term: "محادثات تيد", category: "تعليم", icon: Sparkles },
  ]

  const features = [
    {
      icon: Search,
      title: "بحث متقدم",
      description: "ابحث في أكثر من 70 مليون بودكاست وحلقة"
    },
    {
      icon: Headphones,
      title: "استماع مباشر",
      description: "استمع للبودكاست مباشرة من المتصفح"
    },
    {
      icon: TrendingUp,
      title: "توصيات ذكية",
      description: "اكتشف محتوى جديد يناسب اهتماماتك"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        {/* <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" /> */}
        
          <div className="container mx-auto max-w-6xl">
            {/* Main Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 lg:mb-16"
            >
              <Badge 
                variant="secondary" 
                className="mb-4 lg:mb-6 px-3 py-1 text-sm font-medium"
              >
                <Sparkles className="w-3 h-3 mr-2" />
                اكتشف عالم البودكاست العربي
              </Badge>
              
              <h1 className="text-3xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
                مرحباً بك في{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  اي بودكاست
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 lg:mb-12 px-4 leading-relaxed">
                ابحث في أكثر من 70 مليون بودكاست وحلقة من جميع أنحاء العالم. 
                اكتشف محتوى جديد، استمع مباشرة، واحفظ المفضلة لديك.
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto mb-8 lg:mb-12"
              >
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="ابحث عن بودكاست أو حلقة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-14 pl-4 py-6 text-lg bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 transition-all duration-300 rounded-2xl shadow-lg"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl"
                      disabled={!searchTerm.trim()}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>

              {/* Voice Search Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 lg:mb-12"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 py-3 border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  البحث الصوتي
                </Button>
              </motion.div>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 lg:mb-16"
            >
              <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-6 lg:mb-8 text-center">
                عمليات البحث الشائعة
              </h2>
              <div className="flex flex-wrap justify-center gap-2 lg:gap-3 px-4">
            {["فنجان", "سايوير", "أشياء غيرتنا", "الفجر", "بدون ورق", "محادثات تيد"].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSearch(term)}
                className="px-3 lg:px-4 py-2 bg-accent border border-border rounded-full hover:bg-accent/80 transition-colors text-accent-foreground text-sm lg:text-base"
              >
                {term}
              </button>
            ))}
          </div>
            </motion.div>
          </div>
        
     
      {/* Featured Podcasts Section */}
      <PodcastSection />
      </section>
    </div>
  )
}

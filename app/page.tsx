"use client"

import { PodcastSection } from "@/components/podcast-section"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="text-center py-12 lg:py-20">
        <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6">
          مرحباً بك في اي بودكاست
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 lg:mb-8 px-4">
          ابحث في أكثر من 70 مليون بودكاست وحلقة باستخدام شريط البحث أعلاه.
        </p>

        {/* Popular Searches */}
        <div className="mt-8 lg:mt-12">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4 lg:mb-6">
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
        </div>
      </div>

      {/* Featured Podcasts Section */}
      <PodcastSection />
    </div>
  )
}

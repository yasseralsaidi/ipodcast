"use client"

import { Header } from "@/components/header"
import { PodcastSection } from "@/components/podcast-section"
import { Sidebar } from "@/components/sidebar"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Sidebar />
      <Header onSearch={handleSearch} />

      <main className="mr-64 pt-16">
        <div className="p-6">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-foreground mb-6">مرحباً بك في بحث البودكاست</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              ابحث في أكثر من 70 مليون بودكاست وحلقة باستخدام شريط البحث أعلاه.
            </p>

            {/* Popular Searches */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-foreground mb-6">عمليات البحث الشائعة</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {["فنجان", "جو روغان", "سيريال", "هذا الحياة الأمريكية", "راديولاب", "محادثات تيد"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-accent border border-border rounded-full hover:bg-accent/80 transition-colors text-accent-foreground"
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
      </main>
    </div>
  )
}

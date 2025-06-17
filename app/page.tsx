"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Sidebar />
      <Header onSearch={handleSearch} />

      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-6">Welcome to Podcast Search</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Search through over 70 million podcasts and episodes using the search bar above.
            </p>

            {/* Popular Searches */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-white mb-6">Popular Searches</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {["فنجان", "Joe Rogan", "Serial", "This American Life", "Radiolab", "TED Talks"].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full hover:bg-gray-700 transition-colors text-white"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

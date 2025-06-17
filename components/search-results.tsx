import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { PodcastResult } from "@/lib/types"
import { Calendar, DollarSign, ExternalLink } from "lucide-react"
import Image from "next/image"

interface SearchResultsProps {
  results: PodcastResult[]
  searchTerm: string
  isLoading?: boolean
}

export function SearchResults({ results, searchTerm, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {searchTerm ? `No podcasts found for "${searchTerm}"` : "Start searching for podcasts"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results for "{searchTerm}"</h2>
        <Badge variant="secondary">
          {results.length} podcast{results.length !== 1 ? "s" : ""} found
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((podcast) => (
          <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={podcast.artworkUrl100 || "/placeholder.svg?height=64&width=64"}
                    alt={podcast.collectionName}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
                    {podcast.collectionName || podcast.trackName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{podcast.artistName}</p>
                </div>
              </div>

              <div className="space-y-3">
                {podcast.primaryGenreName && (
                  <Badge variant="outline" className="text-xs">
                    {podcast.primaryGenreName}
                  </Badge>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {podcast.trackCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {podcast.trackCount} episodes
                    </span>
                  )}
                  {podcast.collectionPrice > 0 && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />${podcast.collectionPrice}
                    </span>
                  )}
                </div>

                {podcast.releaseDate && (
                  <p className="text-xs text-gray-500">
                    Released: {new Date(podcast.releaseDate).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  {podcast.collectionViewUrl && (
                    <a
                      href={podcast.collectionViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on iTunes
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

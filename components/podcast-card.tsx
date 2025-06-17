import type { PodcastResult } from "@/lib/types"
import Image from "next/image"

interface PodcastCardProps {
  podcast: PodcastResult
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-800">
        <Image
          src={podcast.artworkUrl600 || podcast.artworkUrl100 || "/placeholder.svg?height=300&width=300"}
          alt={podcast.collectionName || podcast.trackName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
          {podcast.collectionName || podcast.trackName}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-1">{podcast.artistName}</p>
      </div>
    </div>
  )
}

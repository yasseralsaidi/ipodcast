import { Card, CardContent } from "@/components/ui/card"
import type { PodcastResult } from "@/lib/types"
import Image from "next/image"

interface PodcastCardProps {
  podcast: PodcastResult
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Card className="group cursor-pointer transition-colors hover:bg-accent">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
          <Image
            src={podcast.artworkUrl600 || podcast.artworkUrl100 || "/placeholder.svg?height=300&width=300"}
            alt={podcast.collectionName || podcast.trackName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-sm line-clamp-2 leading-tight">
            {podcast.collectionName || podcast.trackName}
          </h3>
          <p className="text-muted-foreground text-xs line-clamp-1">{podcast.artistName}</p>
        </div>
      </CardContent>
    </Card>
  )
}

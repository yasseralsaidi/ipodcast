import { Button } from "@/components/ui/button"
import type { PodcastResult } from "@/lib/types"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"

interface EpisodeListProps {
  episodes: PodcastResult[]
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
        >
          <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={episode.artworkUrl100 || "/placeholder.svg?height=48&width=48"}
              alt={episode.collectionName || episode.trackName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-foreground text-sm font-medium line-clamp-1 mb-1">
              {episode.collectionName || episode.trackName}
            </h4>
            <p className="text-muted-foreground text-xs line-clamp-1">{episode.artistName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

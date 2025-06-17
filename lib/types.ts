import type { PodcastResult as PrismaPodcastResult } from '@prisma/client'

export type PodcastResult = Omit<PrismaPodcastResult, 'createdAt'> & {
  createdAt: string
}

export interface SearchRecord {
  id: string
  searchTerm: string
  results: PodcastResult[]
  createdAt: string
}

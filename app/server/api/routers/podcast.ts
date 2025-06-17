import { createTRPCRouter, publicProcedure } from "@/app/server/api/trpc";
import { db } from "@/app/server/db";
import { searchPodcasts } from "@/app/server/services/itunes";
import { z } from "zod";

// Schema for iTunes API response
const iTunesPodcastSchema = z.object({
  collectionId: z.number(),
  trackId: z.number(),
  artistName: z.string(),
  collectionName: z.string(),
  trackName: z.string(),
  collectionViewUrl: z.string(),
  feedUrl: z.string(),
  artworkUrl30: z.string(),
  artworkUrl60: z.string(),
  artworkUrl100: z.string(),
  collectionPrice: z.number(),
  trackPrice: z.number(),
  releaseDate: z.string(),
  collectionExplicitness: z.string(),
  trackExplicitness: z.string(),
  trackCount: z.number(),
  trackTimeMillis: z.number(),
  country: z.string(),
  currency: z.string(),
  primaryGenreName: z.string(),
  contentAdvisoryRating: z.string(),
  artworkUrl600: z.string(),
  genreIds: z.array(z.string()),
  genres: z.array(z.string()),
});

const iTunesResponseSchema = z.object({
  resultCount: z.number(),
  results: z.array(iTunesPodcastSchema),
});

export const podcastRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ term: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Fetch from iTunes API using the service
        const validatedData = await searchPodcasts(input.term);

        // Create search record
        const searchRecord = await db.searchRecord.create({
          data: {
            searchTerm: input.term,
          },
        });

        // Store podcast results
        const podcastResults = await Promise.all(
          validatedData.results.map((result) =>
            db.podcastResult.create({
              data: {
                collectionId: result.collectionId,
                trackId: result.trackId,
                artistName: result.artistName,
                collectionName: result.collectionName,
                trackName: result.trackName,
                collectionViewUrl: result.collectionViewUrl,
                feedUrl: result.feedUrl,
                artworkUrl30: result.artworkUrl30,
                artworkUrl60: result.artworkUrl60,
                artworkUrl100: result.artworkUrl100,
                collectionPrice: result.collectionPrice,
                trackPrice: result.trackPrice,
                releaseDate: result.releaseDate,
                collectionExplicitness: result.collectionExplicitness,
                trackExplicitness: result.trackExplicitness,
                trackCount: result.trackCount,
                trackTimeMillis: result.trackTimeMillis,
                country: result.country,
                currency: result.currency,
                primaryGenreName: result.primaryGenreName,
                contentAdvisoryRating: result.contentAdvisoryRating,
                artworkUrl600: result.artworkUrl600,
                genreIds: result.genreIds,
                genres: result.genres,
                searchTerm: input.term,
                searchRecordId: searchRecord.id,
              },
            }),
          ),
        );

        return {
          success: true,
          data: podcastResults,
        };
      } catch (error) {
        console.error("Error searching podcasts:", error);
        throw new Error("Failed to search podcasts");
      }
    }),

  getRecentSearches: publicProcedure.query(async () => {
    const recentSearches = await db.searchRecord.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        results: true,
      },
    });

    return recentSearches;
  }),
});

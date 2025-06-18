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
  artworkUrl30: z.string().optional(),
  artworkUrl60: z.string().optional(),
  artworkUrl100: z.string().optional(),
  collectionPrice: z.number().optional(),
  trackPrice: z.number().optional(),
  releaseDate: z.string().optional(),
  collectionExplicitness: z.string().optional(),
  trackExplicitness: z.string().optional(),
  trackCount: z.number().optional(),
  trackTimeMillis: z.number().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
  primaryGenreName: z.string().optional(),
  contentAdvisoryRating: z.string().optional(),
  artworkUrl600: z.string().optional(),
  genreIds: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
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

        try {
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
                  artworkUrl30: result.artworkUrl30 ?? "",
                  artworkUrl60: result.artworkUrl60 ?? "",
                  artworkUrl100: result.artworkUrl100 ?? "",
                  collectionPrice: result.collectionPrice ?? 0,
                  trackPrice: result.trackPrice ?? 0,
                  releaseDate: result.releaseDate ?? "",
                  collectionExplicitness: result.collectionExplicitness ?? "",
                  trackExplicitness: result.trackExplicitness ?? "",
                  trackCount: result.trackCount ?? 0,
                  trackTimeMillis: result.trackTimeMillis ?? 0,
                  country: result.country ?? "",
                  currency: result.currency ?? "",
                  primaryGenreName: result.primaryGenreName ?? "",
                  contentAdvisoryRating: result.contentAdvisoryRating ?? "",
                  artworkUrl600: result.artworkUrl600 ?? "",
                  genreIds: result.genreIds ?? [],
                  genres: result.genres ?? [],
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
        } catch (dbError) {
          console.error("خطأ في قاعدة البيانات:", dbError);
          // If database operations fail, still return the iTunes API results
          // but transform them to match the PodcastResult type
          return {
            success: true,
            data: validatedData.results.map(result => ({
              id: `temp-${result.collectionId}`,
              searchTerm: input.term,
              searchRecordId: 'temp',
              ...result,
              createdAt: new Date().toISOString()
            }))
          };
        }
      } catch (error) {
        console.error("خطأ في البحث عن البودكاست:", error);
        
        // Return empty results instead of throwing error to prevent app crashes
        return {
          success: false,
          data: [],
          error: "فشل في البحث عن البودكاست"
        };
      }
    }),

  getRandomPodcasts: publicProcedure
    .input(z.object({ 
      searchTerm: z.string().optional(),
      limit: z.number().min(1).max(50).default(6)
    }))
    .query(async ({ input }) => {
      try {
        // List of search terms to get diverse podcasts
        const SEARCH_TERMS = [
          "podcast",
          "technology podcast",
          "business podcast", 
          "news podcast",
          "entertainment podcast",
          "education podcast",
          "science podcast",
          "health podcast",
          "sports podcast",
          "music podcast",
          "comedy podcast",
          "true crime podcast",
          "بودكاست",
          "بودكاست تقني",
          "بودكاست أعمال"
        ]

        // Use provided search term or get random one
        const searchTerm = input.searchTerm || SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)]
        
        const allResults: z.infer<typeof iTunesPodcastSchema>[] = []
        const maxAttempts = 3

        // Try multiple search terms to ensure we get enough results
        for (let attempts = 0; allResults.length < input.limit && attempts < maxAttempts; attempts++) {
          const currentSearchTerm = attempts === 0 ? searchTerm : SEARCH_TERMS[Math.floor(Math.random() * SEARCH_TERMS.length)]
          
          try {
            console.log(`Attempt ${attempts + 1}: Searching for "${currentSearchTerm}"`)
            
            // Fetch from iTunes API using the service
            const validatedData = await searchPodcasts(currentSearchTerm)

            if (validatedData.results && validatedData.results.length > 0) {
              // Add new results that we haven't seen before
              const newResults = validatedData.results.filter(newResult => 
                !allResults.some(existingResult => existingResult.collectionId === newResult.collectionId)
              )
              
              allResults.push(...newResults)
              console.log(`Added ${newResults.length} new results from "${currentSearchTerm}", total: ${allResults.length}`)
            } else {
              console.log(`No results found for "${currentSearchTerm}", trying next search term`)
            }
          } catch (error) {
            console.error(`Failed to fetch podcasts for "${currentSearchTerm}":`, error)
          }
          
          // Add a small delay between attempts to avoid rate limiting
          if (attempts < maxAttempts - 1 && allResults.length < input.limit) {
            await new Promise(resolve => setTimeout(resolve, 500))
          }
        }

        if (allResults.length === 0) {
          console.log("No results found after all attempts, returning empty array")
          return []
        }

        // Shuffle the results to get random podcasts
        const shuffledResults = [...allResults].sort(() => Math.random() - 0.5)
        // Take only the specified number of podcasts, or all available if fewer than requested
        const limitedResults = shuffledResults.slice(0, Math.min(input.limit, allResults.length))
        
        console.log(`Successfully returned ${limitedResults.length} random podcasts from ${allResults.length} total results`)
        return limitedResults
      } catch (error) {
        console.error("خطأ في جلب البودكاست العشوائي:", error)
        
        // Return empty array instead of throwing error to prevent app crashes
        // This allows the UI to handle the empty state gracefully
        return []
      }
    }),

  getPodcastById: publicProcedure
    .input(z.object({ 
      collectionId: z.number()
    }))
    .query(async ({ input }) => {
      try {
        // Search for the podcast by ID
        const validatedData = await searchPodcasts(input.collectionId.toString())
        
        if (!validatedData.results || validatedData.results.length === 0) {
          throw new Error("لم يتم العثور على البودكاست")
        }

        // Find the podcast with matching collectionId
        const podcast = validatedData.results.find(p => p.collectionId === input.collectionId)
        
        if (!podcast) {
          throw new Error("لم يتم العثور على البودكاست")
        }

        return podcast
      } catch (error) {
        console.error("خطأ في جلب البودكاست بالمعرف:", error)
        
        // Return null instead of throwing error to prevent app crashes
        // This allows the UI to handle the null state gracefully
        return null
      }
    }),

  getRecentSearches: publicProcedure.query(async () => {
    try {
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
    } catch (error) {
      console.error("خطأ في جلب عمليات البحث الأخيرة:", error);
      return [];
    }
  }),
});

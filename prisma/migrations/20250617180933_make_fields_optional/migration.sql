-- AlterTable
ALTER TABLE "podcast_results" ALTER COLUMN "trackTimeMillis" DROP NOT NULL,
ALTER COLUMN "contentAdvisoryRating" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "podcast_results_searchTerm_idx" ON "podcast_results"("searchTerm");

-- CreateIndex
CREATE INDEX "podcast_results_createdAt_idx" ON "podcast_results"("createdAt");

-- CreateIndex
CREATE INDEX "podcast_results_collectionId_idx" ON "podcast_results"("collectionId");

-- CreateIndex
CREATE INDEX "podcast_results_trackId_idx" ON "podcast_results"("trackId");

-- CreateIndex
CREATE INDEX "search_records_searchTerm_idx" ON "search_records"("searchTerm");

-- CreateIndex
CREATE INDEX "search_records_createdAt_idx" ON "search_records"("createdAt");

-- CreateTable
CREATE TABLE "search_records" (
    "id" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "podcast_results" (
    "id" TEXT NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    "artistName" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "trackName" TEXT NOT NULL,
    "collectionViewUrl" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "artworkUrl30" TEXT NOT NULL,
    "artworkUrl60" TEXT NOT NULL,
    "artworkUrl100" TEXT NOT NULL,
    "collectionPrice" DOUBLE PRECISION NOT NULL,
    "trackPrice" DOUBLE PRECISION NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "collectionExplicitness" TEXT NOT NULL,
    "trackExplicitness" TEXT NOT NULL,
    "trackCount" INTEGER NOT NULL,
    "trackTimeMillis" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "primaryGenreName" TEXT NOT NULL,
    "contentAdvisoryRating" TEXT NOT NULL,
    "artworkUrl600" TEXT NOT NULL,
    "genreIds" TEXT[],
    "genres" TEXT[],
    "searchTerm" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "searchRecordId" TEXT NOT NULL,

    CONSTRAINT "podcast_results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "podcast_results" ADD CONSTRAINT "podcast_results_searchRecordId_fkey" FOREIGN KEY ("searchRecordId") REFERENCES "search_records"("id") ON DELETE CASCADE ON UPDATE CASCADE;

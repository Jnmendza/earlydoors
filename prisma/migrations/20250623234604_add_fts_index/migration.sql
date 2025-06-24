-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "search_vector" tsvector;

-- CreateIndex
CREATE INDEX "Club_search_vector_idx" ON "Club" USING GIN ("search_vector");

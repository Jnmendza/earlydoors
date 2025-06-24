-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "is_watch_party" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supporters_group_id" UUID;

-- CreateIndex
CREATE INDEX "Club_name_idx" ON "Club"("name");

-- CreateIndex
CREATE INDEX "Event_club_id_idx" ON "Event"("club_id");

-- CreateIndex
CREATE INDEX "Event_supporters_group_id_idx" ON "Event"("supporters_group_id");

-- CreateIndex
CREATE INDEX "Event_venue_id_idx" ON "Event"("venue_id");

-- CreateIndex
CREATE INDEX "SupportersGroup_club_id_idx" ON "SupportersGroup"("club_id");

-- CreateIndex
CREATE INDEX "Venue_name_idx" ON "Venue"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_supporters_group_id_fkey" FOREIGN KEY ("supporters_group_id") REFERENCES "SupportersGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "VenueClubAffiliate" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venueId" UUID NOT NULL,
    "clubId" UUID NOT NULL,

    CONSTRAINT "VenueClubAffiliate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VenueClubAffiliate_venueId_clubId_key" ON "VenueClubAffiliate"("venueId", "clubId");

-- AddForeignKey
ALTER TABLE "VenueClubAffiliate" ADD CONSTRAINT "VenueClubAffiliate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueClubAffiliate" ADD CONSTRAINT "VenueClubAffiliate_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

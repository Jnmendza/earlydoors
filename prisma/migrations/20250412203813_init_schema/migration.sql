-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "SupportersGroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "club_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "group_logo_url" TEXT,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website_url" TEXT,
    "ig_handle" TEXT,
    "state" TEXT,
    "status" "Status" DEFAULT 'PENDING',

    CONSTRAINT "supporters_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "website_url" TEXT NOT NULL,
    "google_maps_url" TEXT NOT NULL,
    "logo_url" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "has_garden" BOOLEAN NOT NULL DEFAULT false,
    "has_big_screen" BOOLEAN NOT NULL DEFAULT false,
    "has_outdoor_screens" BOOLEAN NOT NULL DEFAULT false,
    "is_bookable" BOOLEAN NOT NULL DEFAULT false,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "status" "Status" DEFAULT 'PENDING',

    CONSTRAINT "venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT,
    "venue_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "club_id" UUID DEFAULT gen_random_uuid(),
    "has_garden" BOOLEAN NOT NULL DEFAULT false,
    "has_big_screen" BOOLEAN NOT NULL DEFAULT false,
    "has_outdoor_screens" BOOLEAN NOT NULL DEFAULT false,
    "is_bookable" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" DEFAULT 'PENDING',
    "date" DATE NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL DEFAULT '',
    "league" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "Status" DEFAULT 'PENDING',

    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupportersGroup" ADD CONSTRAINT "supporters_group_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE NO ACTION ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "Club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "Venue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

/*
  Warnings:

  - Made the column `state` on table `SupportersGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Club" ALTER COLUMN "logo_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "venue_id" DROP DEFAULT,
ALTER COLUMN "club_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SupportersGroup" ALTER COLUMN "club_id" DROP DEFAULT,
ALTER COLUMN "group_logo_url" SET DEFAULT '',
ALTER COLUMN "website_url" SET DEFAULT '',
ALTER COLUMN "ig_handle" SET DEFAULT '',
ALTER COLUMN "state" SET NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "logo_url" SET DEFAULT '';

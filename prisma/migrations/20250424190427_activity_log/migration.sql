-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('SUPPORTERS_GROUP', 'CLUB', 'VENUE', 'EVENT');

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ActivityType" NOT NULL,
    "action" TEXT NOT NULL,
    "referenced_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

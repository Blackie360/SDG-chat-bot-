/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followers" JSONB,
ADD COLUMN     "forks" INTEGER,
ADD COLUMN     "githubData" JSONB,
ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "issues" JSONB,
ADD COLUMN     "prs" JSONB,
ADD COLUMN     "recentActivity" JSONB,
ADD COLUMN     "repos" JSONB,
ADD COLUMN     "stars" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

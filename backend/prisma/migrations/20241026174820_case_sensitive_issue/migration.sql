/*
  Warnings:

  - You are about to drop the column `isAtive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAtive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

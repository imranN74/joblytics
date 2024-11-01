/*
  Warnings:

  - Added the required column `lastRemindedDate` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mail" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastRemindedDate" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `updated` on the `JobApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "updated",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

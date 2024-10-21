/*
  Warnings:

  - Added the required column `appNote` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "appNote" TEXT NOT NULL;

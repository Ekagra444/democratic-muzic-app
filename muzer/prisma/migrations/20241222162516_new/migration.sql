/*
  Warnings:

  - Made the column `extractedId` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "extractedId" SET NOT NULL;

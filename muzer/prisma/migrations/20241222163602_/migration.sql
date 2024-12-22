-- DropIndex
DROP INDEX "Stream_extractedId_key";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "extractedId" DROP NOT NULL;

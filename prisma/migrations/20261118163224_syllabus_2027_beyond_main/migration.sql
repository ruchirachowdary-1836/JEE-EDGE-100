-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "beyondMain" TEXT[] DEFAULT ARRAY[]::TEXT[];

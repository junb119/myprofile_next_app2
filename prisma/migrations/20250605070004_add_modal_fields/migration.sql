-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "attribute" TEXT,
ADD COLUMN     "modalImages" TEXT[],
ADD COLUMN     "modalTags" TEXT[],
ADD COLUMN     "tags" TEXT[];

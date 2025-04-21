-- DropIndex
DROP INDEX "SkillCategory_name_key";

-- AlterTable
ALTER TABLE "SkillCategory" ALTER COLUMN "description" DROP NOT NULL;

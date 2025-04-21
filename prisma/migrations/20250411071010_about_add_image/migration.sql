/*
  Warnings:

  - Added the required column `image` to the `AboutMe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutMe" ADD COLUMN     "image" TEXT NOT NULL;

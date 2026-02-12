/*
  Warnings:

  - Added the required column `filename` to the `refunds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refunds" ADD COLUMN     "filename" TEXT NOT NULL;

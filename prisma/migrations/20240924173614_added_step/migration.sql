/*
  Warnings:

  - Added the required column `step` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Step" AS ENUM ('NEW', 'STARTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "step" "Step" NOT NULL;

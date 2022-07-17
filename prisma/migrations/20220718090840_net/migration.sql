/*
  Warnings:

  - Added the required column `quantity` to the `motel_utility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motel_utility` ADD COLUMN `quantity` INTEGER NOT NULL;

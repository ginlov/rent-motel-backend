/*
  Warnings:

  - You are about to drop the column `update_at` on the `motel_utility` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `motel_utility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_public` to the `motels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `motel_utility` DROP COLUMN `update_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `motels` ADD COLUMN `request_public` BOOLEAN NOT NULL;

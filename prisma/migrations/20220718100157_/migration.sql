/*
  Warnings:

  - A unique constraint covering the columns `[motel_id,utility_id]` on the table `motel_utility` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `motel_utility_motel_id_utility_id_key` ON `motel_utility`(`motel_id`, `utility_id`);

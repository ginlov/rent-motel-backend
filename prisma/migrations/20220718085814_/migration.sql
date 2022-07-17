/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `utilities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `utilities_type_key` ON `utilities`(`type`);

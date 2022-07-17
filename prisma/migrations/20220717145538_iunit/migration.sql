-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_address_id_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `address_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

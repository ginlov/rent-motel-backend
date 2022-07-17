-- AlterTable
ALTER TABLE `users` MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL;

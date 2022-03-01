/*
  Warnings:

  - You are about to drop the `restauaddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `useraddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_restauAddressId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userAddressId_fkey`;

-- DropTable
DROP TABLE `restauaddress`;

-- DropTable
DROP TABLE `useraddress`;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` VARCHAR(191) NOT NULL,
    `commune` VARCHAR(191) NULL,
    `address` LONGTEXT NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `restauId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userAddressId_fkey` FOREIGN KEY (`userAddressId`) REFERENCES `Address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_restauAddressId_fkey` FOREIGN KEY (`restauAddressId`) REFERENCES `Address`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `restauaddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restauimages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `restautokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `useraddress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_mainImageId_fkey`;

-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `Restaurant_restauAddressId_fkey`;

-- DropForeignKey
ALTER TABLE `restautokens` DROP FOREIGN KEY `RestauTokens_restauId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_tokenId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userAddressId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userRoleId_fkey`;

-- AlterTable
ALTER TABLE `restauaddress` DROP PRIMARY KEY,
    MODIFY `addressId` VARCHAR(191) NOT NULL,
    MODIFY `restauId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`addressId`);

-- AlterTable
ALTER TABLE `restauimages` DROP PRIMARY KEY,
    MODIFY `imageId` VARCHAR(191) NOT NULL,
    MODIFY `restauId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`imageId`);

-- AlterTable
ALTER TABLE `restaurant` DROP PRIMARY KEY,
    MODIFY `restauId` VARCHAR(191) NOT NULL,
    MODIFY `restauAddressId` VARCHAR(191) NULL,
    MODIFY `mainImageId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`restauId`);

-- AlterTable
ALTER TABLE `restautokens` DROP PRIMARY KEY,
    MODIFY `tokenId` VARCHAR(191) NOT NULL,
    MODIFY `restauId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`tokenId`);

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    MODIFY `roleId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`roleId`);

-- AlterTable
ALTER TABLE `tokens` DROP PRIMARY KEY,
    MODIFY `tokenId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`tokenId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `tokenId` VARCHAR(191) NULL,
    MODIFY `userRoleId` VARCHAR(191) NOT NULL,
    MODIFY `userAddressId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `useraddress` DROP PRIMARY KEY,
    MODIFY `addressId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`addressId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_tokenId_fkey` FOREIGN KEY (`tokenId`) REFERENCES `Tokens`(`tokenId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userRoleId_fkey` FOREIGN KEY (`userRoleId`) REFERENCES `Role`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userAddressId_fkey` FOREIGN KEY (`userAddressId`) REFERENCES `UserAddress`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_restauAddressId_fkey` FOREIGN KEY (`restauAddressId`) REFERENCES `RestauAddress`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_mainImageId_fkey` FOREIGN KEY (`mainImageId`) REFERENCES `RestauImages`(`imageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestauTokens` ADD CONSTRAINT `RestauTokens_restauId_fkey` FOREIGN KEY (`restauId`) REFERENCES `Restaurant`(`restauId`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `password` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `restauId` on the `restautokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `restautokens` table. All the data in the column will be lost.
  - You are about to drop the column `tokenId` on the `user` table. All the data in the column will be lost.
  - Added the required column `restauUserId` to the `RestauTokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `restautokens` DROP FOREIGN KEY `RestauTokens_restauId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_tokenId_fkey`;

-- AlterTable
ALTER TABLE `restaurant` DROP COLUMN `password`,
    DROP COLUMN `username`;

-- AlterTable
ALTER TABLE `restautokens` DROP COLUMN `restauId`,
    DROP COLUMN `userId`,
    ADD COLUMN `restauUserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `tokenId`;

-- CreateTable
CREATE TABLE `RestauUser` (
    `restauUserId` VARCHAR(191) NOT NULL,
    `restauId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `completeName` VARCHAR(191) NOT NULL,
    `userImage` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'AGENT') NOT NULL DEFAULT 'AGENT',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`restauUserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tokens` ADD CONSTRAINT `Tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestauTokens` ADD CONSTRAINT `RestauTokens_restauUserId_fkey` FOREIGN KEY (`restauUserId`) REFERENCES `RestauUser`(`restauUserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestauUser` ADD CONSTRAINT `RestauUser_restauId_fkey` FOREIGN KEY (`restauId`) REFERENCES `Restaurant`(`restauId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestauUser` ADD CONSTRAINT `RestauUser_userImage_fkey` FOREIGN KEY (`userImage`) REFERENCES `RestauImages`(`imageId`) ON DELETE RESTRICT ON UPDATE CASCADE;

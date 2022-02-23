-- CreateTable
CREATE TABLE `Restaurant` (
    `restauId` INTEGER NOT NULL AUTO_INCREMENT,
    `restauName` VARCHAR(191) NOT NULL,
    `restauDescription` LONGTEXT NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `restauAddressId` INTEGER NULL,
    `mainImageId` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`restauId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestauTokens` (
    `tokenId` INTEGER NOT NULL AUTO_INCREMENT,
    `token` LONGTEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `restauId` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RestauTokens_restauId_key`(`restauId`),
    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestauAddress` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `commune` VARCHAR(191) NULL,
    `address` LONGTEXT NOT NULL,
    `longitude` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `restauId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestauImages` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `address` LONGTEXT NOT NULL,
    `publicUrl` LONGTEXT NOT NULL,
    `imageUrl` LONGTEXT NOT NULL,
    `restauId` INTEGER NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_restauAddressId_fkey` FOREIGN KEY (`restauAddressId`) REFERENCES `RestauAddress`(`addressId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_mainImageId_fkey` FOREIGN KEY (`mainImageId`) REFERENCES `RestauImages`(`imageId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestauTokens` ADD CONSTRAINT `RestauTokens_restauId_fkey` FOREIGN KEY (`restauId`) REFERENCES `Restaurant`(`restauId`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `artistDescription` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "artistDescription" TEXT NOT NULL,
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "discount" TEXT NOT NULL,
ADD COLUMN     "image" TEXT[],
ADD COLUMN     "mrp" TEXT NOT NULL;

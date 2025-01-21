/*
  Warnings:

  - You are about to drop the column `createdAt` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Uniform` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Uniform` table. All the data in the column will be lost.
  - Added the required column `subcategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `schoolId` on table `Uniform` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Uniform" DROP CONSTRAINT "Uniform_schoolId_fkey";

-- AlterTable
ALTER TABLE "District" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "subcategoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "School" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Uniform" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "schoolId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uniform" ADD CONSTRAINT "Uniform_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The values [hoodie,tshirt] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('BRAHMAND', 'NIRBHAY');

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('HOODIE', 'TSHIRT');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brand" "Brand" NOT NULL;

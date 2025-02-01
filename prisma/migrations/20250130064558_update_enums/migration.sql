/*
  Warnings:

  - The values [BRAHMAND,NIRBHAY] on the enum `Brand` will be removed. If these variants are still used in the database, this will fail.
  - The values [HOODIE,TSHIRT] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Brand_new" AS ENUM ('brahmand', 'nirbhay');
ALTER TABLE "Product" ALTER COLUMN "brand" TYPE "Brand_new" USING ("brand"::text::"Brand_new");
ALTER TYPE "Brand" RENAME TO "Brand_old";
ALTER TYPE "Brand_new" RENAME TO "Brand";
DROP TYPE "Brand_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('hoodie', 'tshirt');
ALTER TABLE "Product" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

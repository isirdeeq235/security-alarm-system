/*
  Warnings:

  - You are about to alter the column `location` on the `Request` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Request` MODIFY `location` JSON NULL;

/*
  Warnings:

  - You are about to alter the column `price` on the `Package` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `ammount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE `Package` MODIFY `price` DECIMAL(65, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `ammount` DECIMAL(65, 2) NOT NULL DEFAULT 0,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `catatan` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `hargaClaimOli` on the `SparePart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SparePart" DROP COLUMN "catatan",
DROP COLUMN "hargaClaimOli";

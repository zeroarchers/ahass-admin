/*
  Warnings:

  - You are about to drop the column `etaTercepat` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `etaTerlama` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `hargaJual` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `hargaJualHET` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `kategoriETD` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `nilaiDiskon` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `persentaseDiskon` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `rak` on the `SparePart` table. All the data in the column will be lost.
  - You are about to drop the column `stok` on the `SparePart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SparePart" DROP COLUMN "etaTercepat",
DROP COLUMN "etaTerlama",
DROP COLUMN "hargaJual",
DROP COLUMN "hargaJualHET",
DROP COLUMN "kategoriETD",
DROP COLUMN "label",
DROP COLUMN "nilaiDiskon",
DROP COLUMN "persentaseDiskon",
DROP COLUMN "rak",
DROP COLUMN "stok",
ADD COLUMN     "hargaClaimOli" INTEGER,
ALTER COLUMN "hargaNasional" DROP NOT NULL,
ALTER COLUMN "grupKodeAHM" DROP NOT NULL;

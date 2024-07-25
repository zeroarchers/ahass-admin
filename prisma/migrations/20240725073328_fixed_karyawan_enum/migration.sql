/*
  Warnings:

  - Changed the type of `komisi_penjualan` on the `Karyawan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Karyawan" DROP COLUMN "komisi_penjualan",
ADD COLUMN     "komisi_penjualan" TEXT NOT NULL;

-- DropEnum
DROP TYPE "KomisiPenjualan";

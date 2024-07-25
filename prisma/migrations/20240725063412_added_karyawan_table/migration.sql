/*
  Warnings:

  - You are about to drop the column `aktif` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `areaID` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `berlakuKTP` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `cityID` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `jenisKelamin` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `kTP` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `kebangsaan` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `kodeKaryawan` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `namaKaryawan` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `nik` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `nilaiKomisi` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `noHP` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `noTelepon` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `provinceID` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `satuanKomisi` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `statusKaryawan` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `statusKawin` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `statusKomisi` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `statusPIT` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalBerhenti` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalLahir` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalMasuk` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `tempatLahir` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the column `tipeKomisi` on the `Karyawan` table. All the data in the column will be lost.
  - You are about to drop the `Area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jabatan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payroll` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Karyawan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[noktp]` on the table `Karyawan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `berlaku_hingga` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gaji_pokok` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `honda_id` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jabatan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kabupaten` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kecamatan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelurahan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kesehatan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodepos` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `komisi_penjualan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_training` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nohp` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noktp` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notelp` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinsi` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_karyawan_tetap` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_kawin` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_kebangsaan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_pit` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_berhenti` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_masuk` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat_lahir` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transport` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tunjangan_jabatan` to the `Karyawan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uang_harian` to the `Karyawan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KomisiPenjualan" AS ENUM ('TIDAK_AKTIF', 'DEFAULT_MASTER_DATA', 'SEMUA_BARANG_DAN_JASA');

-- DropForeignKey
ALTER TABLE "Jabatan" DROP CONSTRAINT "Jabatan_karyawanID_fkey";

-- DropForeignKey
ALTER TABLE "Karyawan" DROP CONSTRAINT "Karyawan_areaID_fkey";

-- DropForeignKey
ALTER TABLE "Karyawan" DROP CONSTRAINT "Karyawan_cityID_fkey";

-- DropForeignKey
ALTER TABLE "Karyawan" DROP CONSTRAINT "Karyawan_provinceID_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_karyawanID_fkey";

-- AlterTable
ALTER TABLE "Karyawan" DROP COLUMN "aktif",
DROP COLUMN "areaID",
DROP COLUMN "berlakuKTP",
DROP COLUMN "cityID",
DROP COLUMN "jenisKelamin",
DROP COLUMN "kTP",
DROP COLUMN "kebangsaan",
DROP COLUMN "kodeKaryawan",
DROP COLUMN "namaKaryawan",
DROP COLUMN "nik",
DROP COLUMN "nilaiKomisi",
DROP COLUMN "noHP",
DROP COLUMN "noTelepon",
DROP COLUMN "provinceID",
DROP COLUMN "satuanKomisi",
DROP COLUMN "statusKaryawan",
DROP COLUMN "statusKawin",
DROP COLUMN "statusKomisi",
DROP COLUMN "statusPIT",
DROP COLUMN "tanggalBerhenti",
DROP COLUMN "tanggalLahir",
DROP COLUMN "tanggalMasuk",
DROP COLUMN "tempatLahir",
DROP COLUMN "tipeKomisi",
ADD COLUMN     "berlaku_hingga" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gaji_pokok" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "honda_id" TEXT NOT NULL,
ADD COLUMN     "jabatan" TEXT NOT NULL,
ADD COLUMN     "kabupaten" TEXT NOT NULL,
ADD COLUMN     "kecamatan" TEXT NOT NULL,
ADD COLUMN     "kelurahan" TEXT NOT NULL,
ADD COLUMN     "kesehatan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "kodepos" TEXT NOT NULL,
ADD COLUMN     "komisi_penjualan" "KomisiPenjualan" NOT NULL,
ADD COLUMN     "level_training" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "nohp" TEXT NOT NULL,
ADD COLUMN     "noktp" TEXT NOT NULL,
ADD COLUMN     "notelp" TEXT NOT NULL,
ADD COLUMN     "provinsi" TEXT NOT NULL,
ADD COLUMN     "status_karyawan_tetap" BOOLEAN NOT NULL,
ADD COLUMN     "status_kawin" TEXT NOT NULL,
ADD COLUMN     "status_kebangsaan" TEXT NOT NULL,
ADD COLUMN     "status_pit" BOOLEAN NOT NULL,
ADD COLUMN     "tanggal_berhenti" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_lahir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_masuk" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tempat_lahir" TEXT NOT NULL,
ADD COLUMN     "transport" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tunjangan_jabatan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uang_harian" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "catatan" DROP NOT NULL,
ALTER COLUMN "agama" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Area";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Jabatan";

-- DropTable
DROP TABLE "Payroll";

-- DropTable
DROP TABLE "Province";

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_email_key" ON "Karyawan"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Karyawan_noktp_key" ON "Karyawan"("noktp");

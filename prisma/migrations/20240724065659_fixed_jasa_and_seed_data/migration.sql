/*
  Warnings:

  - The primary key for the `Jasa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Catatan` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `HargaJual` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `JobType` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `JobTypeDesc` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `KategoriPekerjaan` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `Kode` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `SatuanKerja` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `StatusAktif` on the `Jasa` table. All the data in the column will be lost.
  - You are about to drop the column `WaktuKerja` on the `Jasa` table. All the data in the column will be lost.
  - Added the required column `hargaJual` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTypeDesc` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoriPekerjaan` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satuanKerja` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusAktif` to the `Jasa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuKerja` to the `Jasa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jasa" DROP CONSTRAINT "Jasa_pkey",
DROP COLUMN "Catatan",
DROP COLUMN "HargaJual",
DROP COLUMN "JobType",
DROP COLUMN "JobTypeDesc",
DROP COLUMN "KategoriPekerjaan",
DROP COLUMN "Kode",
DROP COLUMN "SatuanKerja",
DROP COLUMN "StatusAktif",
DROP COLUMN "WaktuKerja",
ADD COLUMN     "catatan" TEXT,
ADD COLUMN     "hargaJual" INTEGER NOT NULL,
ADD COLUMN     "jobType" TEXT NOT NULL,
ADD COLUMN     "jobTypeDesc" TEXT NOT NULL,
ADD COLUMN     "kategoriPekerjaan" TEXT NOT NULL,
ADD COLUMN     "kode" TEXT NOT NULL,
ADD COLUMN     "satuanKerja" TEXT NOT NULL,
ADD COLUMN     "statusAktif" TEXT NOT NULL,
ADD COLUMN     "waktuKerja" INTEGER NOT NULL,
ADD CONSTRAINT "Jasa_pkey" PRIMARY KEY ("kode");

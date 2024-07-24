/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "SparePart" (
    "id" INTEGER NOT NULL,
    "namaSparepart" TEXT NOT NULL,
    "namaLokalSparepart" TEXT,
    "kodeSparepart" TEXT NOT NULL,
    "grupSparepart" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "hargaLokal" INTEGER NOT NULL,
    "hargaNasional" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "hargaJualHET" INTEGER NOT NULL,
    "uom" TEXT NOT NULL,
    "rak" TEXT,
    "aktif" BOOLEAN NOT NULL,
    "nilaiDiskon" INTEGER NOT NULL,
    "persentaseDiskon" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "grupKodeAHM" TEXT NOT NULL,
    "kategoriETD" TEXT,
    "etaTercepat" TIMESTAMP(3) NOT NULL,
    "etaTerlama" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SparePart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jasa" (
    "Kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "JobType" TEXT NOT NULL,
    "JobTypeDesc" TEXT NOT NULL,
    "KategoriPekerjaan" TEXT NOT NULL,
    "HargaJual" INTEGER NOT NULL,
    "WaktuKerja" INTEGER NOT NULL,
    "SatuanKerja" TEXT NOT NULL,
    "Catatan" TEXT,
    "StatusAktif" TEXT NOT NULL,

    CONSTRAINT "Jasa_pkey" PRIMARY KEY ("Kode")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

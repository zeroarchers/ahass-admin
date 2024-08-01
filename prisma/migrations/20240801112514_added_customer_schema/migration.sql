-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "kode" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "noktp" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3),
    "nopassport" TEXT,
    "alamat" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "kodepos" TEXT NOT NULL,
    "notelp" TEXT,
    "nohp" TEXT NOT NULL,
    "email" TEXT,
    "catatan" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

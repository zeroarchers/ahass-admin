-- CreateTable
CREATE TABLE "TipeKendaraanAHM" (
    "idTipeKendaraanAHM" INTEGER NOT NULL,
    "kodeTipeKendaraanAHM" TEXT NOT NULL,

    CONSTRAINT "TipeKendaraanAHM_pkey" PRIMARY KEY ("idTipeKendaraanAHM")
);

-- CreateTable
CREATE TABLE "TipeKendaraan" (
    "id" INTEGER NOT NULL,
    "idTipeKendaraanAHM" INTEGER NOT NULL,
    "rowStatus" INTEGER NOT NULL,
    "tipe" TEXT NOT NULL,
    "namaTipe" TEXT NOT NULL,
    "cc" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL,

    CONSTRAINT "TipeKendaraan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TipeKendaraan" ADD CONSTRAINT "TipeKendaraan_idTipeKendaraanAHM_fkey" FOREIGN KEY ("idTipeKendaraanAHM") REFERENCES "TipeKendaraanAHM"("idTipeKendaraanAHM") ON DELETE RESTRICT ON UPDATE CASCADE;

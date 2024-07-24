-- CreateTable
CREATE TABLE "Karyawan" (
    "id" SERIAL NOT NULL,
    "kodeKaryawan" TEXT NOT NULL,
    "namaKaryawan" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "cityID" INTEGER NOT NULL,
    "provinceID" INTEGER NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "noHP" TEXT NOT NULL,
    "kTP" TEXT NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL,
    "tanggalBerhenti" TIMESTAMP(3) NOT NULL,
    "areaID" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "catatan" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "agama" INTEGER NOT NULL,
    "berlakuKTP" TIMESTAMP(3) NOT NULL,
    "kebangsaan" INTEGER NOT NULL,
    "statusKawin" INTEGER NOT NULL,
    "statusKaryawan" INTEGER NOT NULL,
    "statusKomisi" INTEGER NOT NULL,
    "tipeKomisi" INTEGER NOT NULL,
    "satuanKomisi" TEXT NOT NULL,
    "nilaiKomisi" DOUBLE PRECISION NOT NULL,
    "statusPIT" INTEGER NOT NULL,
    "nik" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL,

    CONSTRAINT "Karyawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "rowStatus" INTEGER NOT NULL,
    "flag" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "provinceCode" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "provinceID" INTEGER NOT NULL,
    "cityID" INTEGER NOT NULL,
    "zipCode" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "ahmCode" TEXT NOT NULL,
    "bpsCode" TEXT NOT NULL,
    "rowStatus" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jabatan" (
    "id" SERIAL NOT NULL,
    "jabatanID" INTEGER NOT NULL,
    "jabatan" TEXT NOT NULL,
    "karyawanID" INTEGER NOT NULL,

    CONSTRAINT "Jabatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "payrollID" INTEGER NOT NULL,
    "gaji" TEXT NOT NULL,
    "nilaiGaji" DOUBLE PRECISION NOT NULL,
    "aktif" BOOLEAN NOT NULL,
    "karyawanID" INTEGER NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pkb" (
    "pkbID" SERIAL NOT NULL,
    "soID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "soNo" TEXT NOT NULL,
    "noPKB" TEXT NOT NULL,
    "noPolisi" TEXT NOT NULL,
    "totalFaktur" DOUBLE PRECISION NOT NULL,
    "tipePembayran" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pkb_pkey" PRIMARY KEY ("pkbID")
);

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_cityID_fkey" FOREIGN KEY ("cityID") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_provinceID_fkey" FOREIGN KEY ("provinceID") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karyawan" ADD CONSTRAINT "Karyawan_areaID_fkey" FOREIGN KEY ("areaID") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jabatan" ADD CONSTRAINT "Jabatan_karyawanID_fkey" FOREIGN KEY ("karyawanID") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_karyawanID_fkey" FOREIGN KEY ("karyawanID") REFERENCES "Karyawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "Karyawan_email_key";

-- AlterTable
ALTER TABLE "Karyawan" ALTER COLUMN "email" DROP NOT NULL;

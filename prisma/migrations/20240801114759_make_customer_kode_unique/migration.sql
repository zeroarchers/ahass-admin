/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_kode_key" ON "Customer"("kode");

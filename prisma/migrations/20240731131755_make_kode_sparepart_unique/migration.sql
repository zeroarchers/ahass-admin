/*
  Warnings:

  - A unique constraint covering the columns `[kodeSparepart]` on the table `SparePart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SparePart_kodeSparepart_key" ON "SparePart"("kodeSparepart");

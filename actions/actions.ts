"use server";
import { prisma } from "@/lib/prisma";
import type { Karyawan, Jasa } from "@prisma/client";

export async function createKaryawan(data: Omit<Karyawan, "id">) {
  await prisma.karyawan.create({ data });
  console.log(data);
}

export async function createJasa(data: Jasa) {
  await prisma.jasa.create({ data });
  console.log(data);
}

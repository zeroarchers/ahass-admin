import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama = searchParams.get("nama");
  const kode = searchParams.get("kode");

  const where: any = {};

  if (nama) {
    where.nama = { contains: nama, mode: "insensitive" };
  }

  if (kode) {
    where.kode = { contains: kode, mode: "insensitive" };
  }
  try {
    const customers = await prisma.customer.findMany({
      where,
      select: {
        id: true,
        kode: true,
        nama: true,
        nohp: true,
        noktp: true,
        alamat: true,
        alamatKirim: true,
        kabupaten: true,
        kecamatan: true,
      },
      take: 10,
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

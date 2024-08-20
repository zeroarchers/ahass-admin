import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.karyawan.findMany({
      where: {
        OR: [
          {
            jabatan: "Mekanik",
          },
          {
            jabatan: "Asisten Mekanik",
          },
        ],
      },
      select: {
        id: true,
        name: true,
        jabatan: true,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

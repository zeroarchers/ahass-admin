import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const no_polisi = searchParams.get("no_polisi") || "";

  try {
    const kendaraan = await prisma.kendaraan.findMany({
      where: {
        no_polisi: {
          contains: no_polisi,
          mode: "insensitive",
        },
      },
      select: {
        no_polisi: true,
        no_mesin: true,
        tahun_rakit: true,
        customer: {
          select: {
            nama: true,
            nohp: true,
          },
        },
      },
      take: 10,
    });

    return NextResponse.json(kendaraan);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

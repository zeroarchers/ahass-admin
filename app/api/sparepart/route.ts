import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama_sparepart = searchParams.get("nama") || "";

  try {
    const sparepart = await prisma.sparePart.findMany({
      where: {
        OR: [
          {
            namaSparepart: {
              contains: nama_sparepart,
              mode: "insensitive",
            },
          },
          {
            kodeSparepart: {
              contains: nama_sparepart,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
    });

    return NextResponse.json(sparepart);
  } catch (error) {
    console.error("API: Error fetching sparepart:", error);
    return NextResponse.json(
      { error: "Failed to fetch sparepart" },
      { status: 500 },
    );
  }
}

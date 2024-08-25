import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama_sparepart = searchParams.get("nama") || "";
  const gudangId = searchParams.get("gudangId") || "";

  try {
    const spareparts = await prisma.sparePart.findMany({
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
      include: {
        Stock: true,
      },
      take: 10,
    });

    const sparepartsWithStock = spareparts.map((sparepart) => ({
      ...sparepart,
      stockCount: sparepart.Stock.reduce(
        (sum, stock) => sum + stock.quantity,
        0,
      ),
    }));

    return NextResponse.json(sparepartsWithStock);
  } catch (error) {
    console.error("API: Error fetching sparepart:", error);
    return NextResponse.json(
      { error: "Failed to fetch sparepart" },
      { status: 500 },
    );
  }
}

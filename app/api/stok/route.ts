import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama_sparepart = searchParams.get("nama") || "";
  const gudangId = searchParams.get("gudangId") || "";

  try {
    const stocks = await prisma.stock.findMany({
      select: {
        quantity: true,
        sparepart: {
          select: {
            kodeSparepart: true,
            namaSparepart: true,
            hargaLokal: true,
            hargaNasional: true,
            uom: true,
            grupSparepart: true,
          },
        },
        gudang: {
          select: {
            nama: true,
          },
        },
      },
      where: {
        gudangId: gudangId,
        sparepart: {
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
      },
      take: 10,
    });

    const sparepartsWithStock = stocks.map((stock) => ({
      gudang: stock.gudang.nama,
      ...stock.sparepart,
      quantity: stock.quantity,
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

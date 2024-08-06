import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const kode_sparepart = searchParams.get("kode") || "";

  console.log("API: Received request for kode:", kode_sparepart);

  try {
    const jasa = await prisma.sparePart.findMany({
      where: {
        kodeSparepart: {
          contains: kode_sparepart,
          mode: "insensitive",
        },
      },
      take: 10,
    });

    console.log(jasa);
    return NextResponse.json(jasa);
  } catch (error) {
    console.error("API: Error fetching sparepart:", error);
    return NextResponse.json(
      { error: "Failed to fetch sparepart" },
      { status: 500 },
    );
  }
}

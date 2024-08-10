import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama_jasa = searchParams.get("nama") || "";

  console.log("API: Received request for name:", nama_jasa);

  try {
    const jasa = await prisma.jasa.findMany({
      where: {
        nama: {
          contains: nama_jasa,
          mode: "insensitive",
        },
      },
      take: 10,
    });

    // console.log(jasa);
    return NextResponse.json(jasa);
  } catch (error) {
    // console.error("API: Error fetching kendaraan:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

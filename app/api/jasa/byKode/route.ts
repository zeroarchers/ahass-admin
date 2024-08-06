import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const kode_jasa = searchParams.get("kode") || "";

  console.log("API: Received request for kode:", kode_jasa);

  try {
    const jasa = await prisma.jasa.findUnique({
      where: {
        kode: kode_jasa,
      },
    });

    console.log(jasa);
    return NextResponse.json(jasa);
  } catch (error) {
    console.error("API: Error fetching kendaraan:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your Prisma client location

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  try {
    const vehicleTypes = await prisma.tipeKendaraan.findMany({
      where: {
        commercialName: {
          not: null,
          contains: search,
          mode: "insensitive",
        },
      },
      select: {
        namaTipe: true,
        commercialName: true,
      },
    });

    return NextResponse.json(vehicleTypes);
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle types" },
      { status: 500 },
    );
  }
}

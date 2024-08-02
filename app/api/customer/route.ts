import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nama = searchParams.get("nama") || "";

  console.log("API: Received request for name:", nama);

  try {
    const customers = await prisma.customer.findMany({
      where: {
        nama: {
          contains: nama,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        kode: true,
        nama: true,
        alamat: true,
      },
      take: 10,
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("API: Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

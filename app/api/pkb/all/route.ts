import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust this import based on your project structure

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("no_pkb");

  try {
    const pkbRecords = await prisma.pKB.findMany({
      where: {
        no_pkb: {
          contains: search || "",
          mode: "insensitive",
        },
        status_pkb: "selesai",
        no_bayar: null,
      },
      select: {
        no_pkb: true,
        no_polisi: true,
        pemilik: true,
      },
    });
    return NextResponse.json(pkbRecords);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch PKB records" },
      { status: 500 },
    );
  }
}

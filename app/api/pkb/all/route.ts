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
        no_bayar: "",
      },
      select: {
        no_pkb: true,
        no_polisi: true,
        pemilik: true,
      },
    });
    console.log("nobayar", pkbRecords);
    return NextResponse.json(pkbRecords);
  } catch (error) {
    console.error("API: Error fetching PKB records:", error);
    return NextResponse.json(
      { error: "Failed to fetch PKB records" },
      { status: 500 },
    );
  }
}

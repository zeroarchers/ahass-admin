import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gudang = await prisma.gudang.findMany({
      select: {
        kode: true,
        nama: true,
      },
    });

    return NextResponse.json(gudang);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

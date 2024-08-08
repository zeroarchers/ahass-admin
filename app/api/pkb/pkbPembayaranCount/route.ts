import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);

  const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);

  const pkbCountForTheYear = await prisma.pKB.count({
    where: {
      tanggal: {
        gte: startOfYear,
        lte: endOfYear,
      },
      no_bayar: {
        not: "",
      },
    },
  });
  const init = 0;
  return NextResponse.json(pkbCountForTheYear + 1 + init);
}

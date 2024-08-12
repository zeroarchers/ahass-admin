import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const queueCountForToday = await prisma.pKB.count({
    where: {
      tanggal: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return NextResponse.json(queueCountForToday);
}

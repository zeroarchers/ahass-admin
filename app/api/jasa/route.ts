import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const jasa = await prisma.jasa.findMany();
    return NextResponse.json({ jasa });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch data.",
      data: error,
    });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const pkb = await prisma.pKB.findUnique({
      where: {
        no_pkb: params.id,
      },
      include: {
        jasaPKB: {
          include: {
            jasa: true,
          },
        },
        sparepartPKB: {
          include: {
            sparepart: true,
          },
        },
        kendaraan: true,
      },
    });

    if (!pkb) {
      return NextResponse.json({ error: "PKB not found" }, { status: 404 });
    }

    return NextResponse.json(pkb);
  } catch (error) {
    console.error("Error fetching PKB:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

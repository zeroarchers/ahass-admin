import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const no_polisi = searchParams.get("no_polisi");

    if (no_polisi === null || no_polisi === "") {
      return NextResponse.json(
        { error: "No Polisi harus diisi!" },
        { status: 404 },
      );
    }

    const pkbList = await prisma.pKB.findMany({
      where: {
        kendaraan: {
          no_polisi: no_polisi,
        },
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

    if (!pkbList.length) {
      return NextResponse.json(
        { error: `Belum ada sejarah PKB untuk no_polisi '${no_polisi}'` },
        { status: 404 },
      );
    }

    return NextResponse.json(pkbList);
  } catch (error) {
    console.error("Error fetching PKB records:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

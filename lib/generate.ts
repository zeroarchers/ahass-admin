import { prisma } from "@/lib/prisma";

export async function generateNoPkb({
  ahassId,
}: {
  ahassId: string;
}): Promise<string> {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  const lastPkb = await prisma.pKB.findFirst({
    where: {
      tanggal: {
        gte: startOfYear,
        lte: endOfYear,
      },
      no_pkb: {
        startsWith: `${ahassId}-PKB-${year}`,
      },
    },
    orderBy: {
      no_pkb: "desc",
    },
  });

  let nextNumber;
  if (lastPkb) {
    const lastNumberStr = lastPkb.no_pkb.split("-")[2];
    const lastNumber = parseInt(lastNumberStr.slice(2), 10);
    nextNumber = (lastNumber + 1).toString().padStart(6, "0");
  } else {
    nextNumber = "000001";
  }

  return `${ahassId}-PKB-${year}${nextNumber}`;
}

export async function generateNoBayar({
  ahassId,
}: {
  ahassId: string;
}): Promise<string> {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  const lastBayar = await prisma.pKB.findFirst({
    where: {
      tanggal: {
        gte: startOfYear,
        lte: endOfYear,
      },
      no_bayar: {
        startsWith: `${ahassId}-SOD-${year}`,
      },
    },
    orderBy: {
      no_bayar: "desc",
    },
  });

  let nextNumber;
  if (lastBayar && lastBayar.no_bayar) {
    const lastNumberStr = lastBayar.no_bayar.split("-")[2];
    const lastNumber = parseInt(lastNumberStr.slice(2), 10);
    nextNumber = (lastNumber + 1).toString().padStart(6, "0");
  } else {
    nextNumber = "000001";
  }

  return `${ahassId}-SOD-${year}${nextNumber}`;
}

export async function generateNoAntrian(tipeAntrian: string): Promise<string> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const maxAntrian = await prisma.pKB.findFirst({
    where: {
      tanggal: {
        gte: today,
        lt: tomorrow,
      },
      no_antrian: {
        startsWith: tipeAntrian.charAt(0).toUpperCase(),
      },
    },
    orderBy: {
      no_antrian: "desc",
    },
    select: {
      no_antrian: true,
    },
  });

  let nextIncrement = 1;
  if (maxAntrian && maxAntrian.no_antrian) {
    const lastQueueNumber = parseInt(maxAntrian.no_antrian.slice(1), 10);
    nextIncrement = lastQueueNumber + 1;
  }

  const prefix = tipeAntrian.charAt(0).toUpperCase();
  const queueNumber = nextIncrement.toString().padStart(3, "0");
  return `${prefix}${queueNumber}`;
}

export async function generateNoBag({
  ahassId,
}: {
  ahassId: string;
}): Promise<string> {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  const lastBag = await prisma.bAG.findFirst({
    where: {
      tanggal: {
        gte: startOfYear,
        lte: endOfYear,
      },
      noBag: {
        startsWith: `${ahassId}-BAG-${year}`,
      },
    },
    orderBy: {
      noBag: "desc",
    },
  });

  let nextNumber;
  if (lastBag) {
    const lastNumberStr = lastBag.noBag.split("-")[2];
    const lastNumber = parseInt(lastNumberStr.slice(2), 10);
    nextNumber = (lastNumber + 1).toString().padStart(6, "0");
  } else {
    nextNumber = "000001";
  }

  return `${ahassId}-BAG-${year}${nextNumber}`;
}

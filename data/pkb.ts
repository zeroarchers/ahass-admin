import { prisma } from "@/lib/prisma";

export const getpkbById = async (id: number) => {
  try {
    const pkb = await prisma.pKB.findUnique({
      where: {
        id: id,
      },
    });
    return pkb;
  } catch {
    return null;
  }
};

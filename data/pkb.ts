import { prisma } from "@/lib/prisma";

export const getpkbById = async (id: number) => {
  try {
    const pkb = await prisma.pkb.findUnique({
      where: {
        pkbID: id,
      },
    });
    return pkb;
  } catch {
    return null;
  }
};

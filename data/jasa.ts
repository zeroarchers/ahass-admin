import { prisma } from "@/lib/prisma";

export const getJasaById = async (id: string) => {
  try {
    const jasa = await prisma.jasa.findUnique({
      where: {
        kode: id,
      },
    });
    return jasa;
  } catch {
    return null;
  }
};

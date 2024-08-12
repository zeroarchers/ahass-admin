import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

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

export const getAllJasa = unstable_cache(async () => {
  return await prisma.jasa.findMany();
});

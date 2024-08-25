import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllBAG = unstable_cache(async () => {
  return await prisma.bAG.findMany();
});

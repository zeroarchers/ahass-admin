import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return existingUser;
  } catch {
    return null;
  }
};

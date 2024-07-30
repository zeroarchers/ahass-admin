"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { loginSchema, registerSchema } from "@/schemas";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";

export async function login(values: z.infer<typeof loginSchema>) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { result: "Error!", description: "Kredensial tidak valid!" };
        case "CredentialsSignin":
          throw error;
        default:
          return { result: "Error!", description: "Telah terjadi kesalahan." };
      }
    }

    throw error;
  }
  return { result: "Error!", description: "Input data tidak valid!" };
}

export async function register(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  const { email, password, nama } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { result: "Error!", description: "Email sudah ada di sistem!" };
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: nama,
    },
  });

  return {
    result: "Success!",
    description: "Email berhasil ditambahkan ke sistem!",
  };
}

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { loginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        console.log(validatedFields);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          console.log(user);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

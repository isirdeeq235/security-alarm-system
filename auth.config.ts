import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as Schemas from "@/schemas";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials, req) {
        try {
          const { login, password }: Schemas.LoginType =
            await Schemas.LoginSchema.parseAsync(credentials);

          if (!login || !password) return null;

          const user = await prisma.user.findFirst({
            where: { OR: [{ matric: login }, { email: login }] },
          });

          if (!user || !user.password) return null; //check if the user has not login using any provider rather than credentials

          const passwordMatched = await bcrypt.compare(password, user.password);

          return passwordMatched ? user : null;
        } catch {
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

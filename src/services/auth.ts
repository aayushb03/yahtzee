import { NextAuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../prisma/client";
import bcrypt from 'bcryptjs';


// used https://www.youtube.com/watch?v=AbUVY16P4Ys to help 
// https://next-auth.js.org/providers/credentials

/**
 * Auth configuration.
 */
export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials:{
        email:{
          label: "Email",
          type: "email",
          placeholder: "Enter email"
        },
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await prisma.user.findFirst({
          where: { Email: credentials.email },
        });

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        if (!user) return null;
        const isCorrectPwd = await bcrypt.compare(credentials.password, user.Password);
        if (isCorrectPwd) {
          return { email: user.Email, name:user.Username } as User;
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
import { NextAuthOptions, User, getServerSession } from "next-auth";
import {useSession} from "next-auth/react"
import { redirect } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../prisma/client";


// used https://www.youtube.com/watch?v=AbUVY16P4Ys to help 
// https://next-auth.js.org/providers/credentials

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials:{
                username:{
                    label: "Username",
                    type: "text",
                    placeholder: "Your name here"
                },
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials || !credentials.username || !credentials.password) {
                  // Any object returned will be saved in `user` property of the JWT
                  return null
                } 
              

              // implement this when database changed 
              // first verifying username then password 

              /*

              const dbUser = await prisma.user.findFirst({
                where: {username: credentials.username}
              })

              if(dbUser && dbUser.password === credentials.password){
                const {password, createdAt, id, ...dbUserWithoutPassword} = dbUser
                return dbUserWithoutPassword as User
              }
              */
              
              return null
              
            },
        }),
    ],
};
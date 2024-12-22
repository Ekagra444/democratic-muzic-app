// [...nextauth].ts - Next.js Authentication Endpoint

import prismaClient from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        // Add user ID to token
        if (user) {
            token.id = user.id; // Add user ID from the provider to the JWT token
        }
        return token;
    },
    async session({ session, token }) {
        // Pass user ID from token to session
        if (token) {
            if (session.user) {
                session.user.id = token.id as string;
            }
        }
        return session;
    },
    async signIn(params){
        console.log(params.user.email);
        if(!params.user.email){
            return false ;
        }
        try {

            const existingUser = await prismaClient.user.findUnique({
            where: { email: params.user.email },
        });

        if (!existingUser) {
            // If the user doesn't exist, create a new user record
            await prismaClient.user.create({
                data: {
                    email: params.user.email,
                    provider: "Google",
                },
            })
        }
        } catch (error) {
            console.log(error);
        }
        return true;
    },
},

});

export { handler as GET, handler as POST };

// [...nextauth].ts - Next.js Authentication Endpoint

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };

import clientPromise from "#/lib/mongodb";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ]
}

export default NextAuth(authOptions)
import clientPromise, { connectToMongoDB } from "#/lib/mongodb";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { Users } from "#/models/Schema";
import { compare } from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Credentials({
            name:"Credentials",
            async authorize(credentials, req){
                try {
                    await connectToMongoDB();
                } catch (err) {
                    return ({ error: 'Connection Failed!' });
                }

                // check password
                const result = await Users.find({email:credentials.email})
                if(!result){
                    throw new Error("No user Found with the Email!")
                }

                // compare
                const checkPassword = await compare(credentials!.password, result.password)

                // incorrect password 
                if(!checkPassword || result.email !==credentials.email){
                    throw new Error("Email or password doesn't match")
                }

                return result
            }
        })
    ],
    secret:"M_ga_RCee0rdyHTLSGuIT8pLimD5saLG78vxQ-cVK3k8ZO4QACATQnUVXYBpP9UzPuasyX3aPUcCl_RXAa9Q3A"
}

export default NextAuth(authOptions)



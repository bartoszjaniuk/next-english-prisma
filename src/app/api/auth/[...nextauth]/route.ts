import prisma from "@/utils/connect";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            name: 'Facebook',
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
    session: {
        strategy: 'jwt'
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }



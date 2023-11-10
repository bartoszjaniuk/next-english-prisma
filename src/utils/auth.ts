import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions, Awaitable, User } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./connect";
import { verifyPassword } from "./api/user/verifyPassword";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            name: 'Facebook',
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',

        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials, req) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    return null;
                }

                const isUserValid = await verifyPassword(
                    credentials!.password,
                    user.password!
                );

                if (!isUserValid) {
                    return null;
                }

                return { email: user.email } as Awaitable<User>;
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },


}
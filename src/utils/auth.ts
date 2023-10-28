import { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions: AuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID || '',
            clientSecret: process.env.FACEBOOK_SECRET || '',
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    }

}
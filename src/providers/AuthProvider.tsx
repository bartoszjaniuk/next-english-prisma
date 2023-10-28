'use client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

const AuthProvider = ({ children, session }: PropsWithChildren<{ session: Session | null }>) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider
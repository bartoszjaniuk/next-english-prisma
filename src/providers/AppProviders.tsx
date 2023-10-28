'use client'
import React, { PropsWithChildren } from 'react'
import { fallbackRender } from '@/components/fallbackRender/FallbackRender'
import { ErrorBoundary } from 'react-error-boundary'
import { ThemeProvider } from 'next-themes'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Layout } from '@/components/layout/Layout'

export const AppProviders = ({ children, session }: PropsWithChildren<{ session: Session | null }>) => {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <ErrorBoundary fallbackRender={fallbackRender} >
                    <Layout>
                        {children}
                    </Layout>
                </ErrorBoundary >
            </ThemeProvider>
        </SessionProvider>

    )
}


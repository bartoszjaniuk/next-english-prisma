import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import "../styles/globals.css";
import { authOptions } from './api/auth/[...nextauth]/route'
import { AppProviders } from '@/providers/AppProviders';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders session={session}>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}




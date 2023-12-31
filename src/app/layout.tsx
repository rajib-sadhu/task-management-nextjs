"use client"

import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'task Management',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient} >
        <body className={inter.className}>{children}</body>
        <Toaster />
      </QueryClientProvider>
    </html>
  )
}

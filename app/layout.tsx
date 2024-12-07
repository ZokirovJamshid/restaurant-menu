import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { OrderProvider } from '@/contexts/OrderContext'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurant POS',
  description: 'A simple POS system for restaurants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider>
          {children}
          <Toaster />
        </OrderProvider>
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KodexaLabs Web App',
  description: 'Modular, ultra-responsive UI experiments and production apps',
  keywords: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'GSAP'],
  authors: [{ name: 'KodexaLabs' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
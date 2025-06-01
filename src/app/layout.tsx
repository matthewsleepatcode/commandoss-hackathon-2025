import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import QueryProvider from '@/layouts/Providers/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CommandOSS Hacker Hackathon 2025',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className} antialiased`}>
        <QueryProvider>
          <TooltipProvider>
            <div>{children}</div>
            <ReactQueryDevtools initialIsOpen={false} />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

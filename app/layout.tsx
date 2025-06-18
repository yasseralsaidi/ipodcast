import { AuthProvider } from '@/components/auth/auth-provider'
import { RootLayoutContent } from '@/components/root-layout-content'
import { ThemeProvider } from '@/components/theme-provider'
import SonnerToaster from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { TRPCReactProvider } from './trpc/react'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'اي بودكاست',
  description: 'استكشف البودكاستات والحلقات معنا',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        ibmPlexSansArabic.className
      )}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <RootLayoutContent>
                {children}
              </RootLayoutContent>
              <SonnerToaster />
              {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
            </AuthProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  )
}

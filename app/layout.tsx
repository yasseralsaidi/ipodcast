import { AuthProvider } from '@/components/auth/auth-provider'
import { RootLayoutContent } from '@/components/root-layout-content'
import { ThemeProvider } from '@/components/theme-provider'
import SonnerToaster from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
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
  title: 'iPodcast Search',
  description: 'Search and discover podcasts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn("min-h-screen font-ibm-plex-sans-arabic antialiased", ibmPlexSansArabic.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <AuthProvider>
              <RootLayoutContent>
                {children}
              </RootLayoutContent>
            </AuthProvider>
          </TRPCReactProvider>
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

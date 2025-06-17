'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { useRouter } from 'next/navigation'

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header onSearch={handleSearch} />
        <main className="flex-1 mr-64 pt-16">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 
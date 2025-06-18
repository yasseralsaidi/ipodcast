'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleOverlayClick = () => {
    setSidebarOpen(false)
  }

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          role="button"
          tabIndex={0}
          aria-label="إغلاق القائمة"
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out' : 'fixed right-0 top-0 h-screen'}
        ${isMobile && !sidebarOpen ? 'translate-x-full' : ''}
        ${!isMobile ? 'w-64' : 'w-80'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main content */}
      <div className={`
        flex flex-col flex-1 md:mr-32
      `}>
        <Header 
          onSearch={handleSearch} 
          onMenuToggle={toggleSidebar}
          isMobile={isMobile}
        />
        <main className={`
          flex-1 pt-16 md:mr-32
        `}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 
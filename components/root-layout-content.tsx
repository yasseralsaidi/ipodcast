'use client'

import Loading from '@/app/loading'
import { useAuth } from '@/components/auth/auth-provider'

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return <Loading />
  }

  return children
} 
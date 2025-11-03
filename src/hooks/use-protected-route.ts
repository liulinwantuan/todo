'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

/**
 * 受保护的路由 Hook
 * 用于保护需要登录的页面
 */
export function useProtectedRoute() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  return { user, loading }
}

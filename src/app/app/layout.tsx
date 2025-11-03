'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
      }}>
        <div style={{
          textAlign: 'center',
          fontSize: '18px',
          color: '#6b7280',
        }}>
          加载中...
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

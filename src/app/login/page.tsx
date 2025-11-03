'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: '24px',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px',
  }

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '32px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    marginBottom: '16px',
    boxSizing: 'border-box' as const,
  }

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1,
    marginBottom: '16px',
  }

  const linkStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  }

  const errorStyle: React.CSSProperties = {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '16px',
  }

  const successStyle: React.CSSProperties = {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '16px',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // 登录成功，跳转到仪表板
      setTimeout(() => {
        router.push('/app/dashboard')
      }, 1500)
    }
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>ToDo 应用</span>
        </Link>

        <h1 style={titleStyle}>欢迎回来</h1>
        <p style={subtitleStyle}>登录你的个人账户</p>

        {error && <div style={errorStyle}>❌ {error}</div>}
        {success && (
          <div style={successStyle}>
            ✅ 登录成功！正在跳转到仪表板...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
              disabled={loading}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280' }}>
              <input type="checkbox" disabled={loading} />
              记住我
            </label>
            <Link href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              忘记密码？
            </Link>
          </div>

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ height: '1px', backgroundColor: '#e5e7eb', position: 'relative', marginBottom: '24px' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              padding: '0 16px',
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              或者
            </div>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: 0.5,
          }}
          disabled
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google 登录（即将推出）
        </button>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
          还没有账户？{' '}
          <Link href="/register" style={linkStyle}>
            立即注册
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <Link href="/demo" style={{ ...linkStyle, color: '#6b7280', marginRight: '16px' }}>
            查看演示版
          </Link>
          <Link href="/guest" style={linkStyle}>
            申请对客版
          </Link>
        </div>
      </div>
    </div>
  )
}

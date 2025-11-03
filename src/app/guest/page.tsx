'use client'

import Link from 'next/link'

export default function GuestPage() {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '64px 24px',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '48px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center' as const,
  }

  const buttonStyle: React.CSSProperties = {
    padding: '12px 32px',
    backgroundColor: '#9333ea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '24px',
  }

  const featureGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginTop: '48px',
  }

  const featureItemStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    textAlign: 'center' as const,
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#f3e8ff',
            color: '#9333ea',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '24px'
          }}>
            对客使用版
          </span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
          欢迎使用对客版
        </h1>
        <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.6', marginBottom: '32px' }}>
          专为团队和企业设计的任务管理解决方案<br />
          独立账户体系，数据完全隔离
        </p>

        <div style={{
          padding: '24px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          borderLeft: '4px solid #f59e0b',
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            即将推出
          </h3>
          <p style={{ fontSize: '14px', color: '#78716c' }}>
            对客版正在精心准备中，即将上线完整功能。如需提前体验，请联系管理员获取访问权限。
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login" style={{
            ...buttonStyle,
            backgroundColor: '#3b82f6',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            申请访问权限
          </Link>
          <Link href="/" style={{
            padding: '12px 32px',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#374151',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            返回首页
          </Link>
        </div>

        {/* 功能特性 */}
        <div style={featureGridStyle}>
          <div style={featureItemStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>数据隔离</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>每个客户独立账户，数据完全隔离</p>
          </div>

          <div style={featureItemStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>团队协作</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>支持多人协作，权限分级管理</p>
          </div>

          <div style={featureItemStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>专属统计</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>定制化数据分析报告</p>
          </div>

          <div style={featureItemStyle}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛠️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>技术支持</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>7x24小时专业技术支持</p>
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            对比版本：
            <Link href="/demo" style={{ color: '#3b82f6', textDecoration: 'none', margin: '0 12px' }}>
              公开演示版
            </Link>
            |
            <Link href="/app" style={{ color: '#3b82f6', textDecoration: 'none', margin: '0 12px' }}>
              个人使用版
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

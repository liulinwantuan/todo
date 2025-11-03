'use client'

import Link from 'next/link'

export default function Home() {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)',
    padding: '64px 16px',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  }

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '6px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  return (
    <div style={containerStyle}>
      {/* 标题区域 */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
          ToDo 应用
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          全功能任务管理系统，支持AI助手、画板功能、GitHub图床和离线同步
        </p>
      </div>

      {/* 三个版本卡片 */}
      <div style={gridStyle}>
        {/* 公开演示版 */}
        <div style={cardStyle}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>公开演示版</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>预置虚拟数据，展示所有功能特性</p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
            <li style={{ marginBottom: '8px' }}>• 无需注册登录</li>
            <li style={{ marginBottom: '8px' }}>• 体验完整功能</li>
            <li style={{ marginBottom: '8px' }}>• 虚拟演示数据</li>
            <li>• 快速了解产品</li>
          </ul>
          <Link href="/demo" style={buttonStyle}>
            立即体验
          </Link>
        </div>

        {/* 个人使用版 */}
        <div style={{ ...cardStyle, border: '2px solid #3b82f6' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>个人使用版</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>完整功能，个人数据管理</p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
            <li style={{ marginBottom: '8px' }}>• 任务管理</li>
            <li style={{ marginBottom: '8px' }}>• AI智能助手</li>
            <li style={{ marginBottom: '8px' }}>• 画板功能</li>
            <li>• 数据统计</li>
          </ul>
          <Link href="/app" style={{ ...buttonStyle, backgroundColor: '#2563eb' }}>
            开始使用
          </Link>
        </div>

        {/* 对客使用版 */}
        <div style={cardStyle}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#f3e8ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="24" height="24" fill="none" stroke="#9333ea" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>对客使用版</h2>
          <p style={{ color: '#6b7280', marginBottom: '16px' }}>独立账户体系，团队协作</p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
            <li style={{ marginBottom: '8px' }}>• 独立注册</li>
            <li style={{ marginBottom: '8px' }}>• 数据隔离</li>
            <li style={{ marginBottom: '8px' }}>• 完整功能</li>
            <li>• 团队共享</li>
          </ul>
          <Link href="/guest" style={buttonStyle}>
            申请使用
          </Link>
        </div>
      </div>

      {/* 功能特性 */}
      <div style={{ marginTop: '80px', maxWidth: '800px', margin: '80px auto 0' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>
          核心功能特性
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>AI 智能助手</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>DeepSeek 驱动，智能分析任务并提供建议</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>GitHub 图床</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>免费图片存储，CDN 加速访问</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#f3e8ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#9333ea" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>画板功能</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>支持涂鸦和流程图，随心所欲表达想法</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#ca8a04" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>离线支持</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>快速记录本地存储，网络恢复自动同步</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>数据统计</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>可视化图表分析，深入了解使用习惯</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>智能归档</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>自动完成归档，日历提醒不遗漏</p>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <div style={{ marginTop: '80px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p>基于 Next.js + Supabase + DeepSeek 构建</p>
        <p style={{ marginTop: '8px' }}>© 2025 ToDo App. MIT License.</p>
      </div>
    </div>
  )
}

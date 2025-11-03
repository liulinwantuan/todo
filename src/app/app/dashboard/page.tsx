'use client'

import Link from 'next/link'

export default function DashboardPage() {
  const containerStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  }

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  }

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
  }

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  }

  const sidebarStyle: React.CSSProperties = {
    width: '240px',
    backgroundColor: 'white',
    borderRight: '1px solid #e5e7eb',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }

  const navItemStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }

  const activeNavItem = {
    ...navItemStyle,
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  }

  return (
    <>
      {/* 侧边栏 */}
      <div style={sidebarStyle}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none', marginBottom: '24px' }}>
          ToDo 应用
        </Link>

        <Link href="/app" style={activeNavItem}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          仪表板
        </Link>

        <Link href="/app/todos" style={navItemStyle}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          任务管理
        </Link>

        <Link href="/app/boards" style={navItemStyle}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          我的画板
        </Link>

        <Link href="/app/analytics" style={navItemStyle}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          数据统计
        </Link>

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <Link href="/" style={{ ...navItemStyle, color: '#6b7280' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            退出登录
          </Link>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={containerStyle}>
        {/* 顶部栏 */}
        <div style={headerStyle}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>欢迎回来！</h1>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>今天是 2025年11月3日</p>
          </div>
          <button style={buttonStyle}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            新建任务
          </button>
        </div>

        {/* 统计卡片 */}
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>今日任务</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>8</div>
            <div style={{ color: '#16a34a', fontSize: '14px', marginTop: '4px' }}>↑ 3 个新增</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>已完成</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>24</div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>本周累计</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>我的画板</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9333ea' }}>5</div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>最近更新</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>AI 助手</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ea580c' }}>12</div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>条建议</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          {/* 今日任务 */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>今日任务</h2>
              <Link href="/app/todos" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}>
                查看全部 →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>完成项目架构设计</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>优先级：高 | 分类：工作</div>
                </div>
                <span style={{ padding: '4px 8px', backgroundColor: '#fed7aa', color: '#ea580c', borderRadius: '4px', fontSize: '12px' }}>
                  高
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>集成 DeepSeek AI</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>优先级：紧急 | 分类：开发</div>
                </div>
                <span style={{ padding: '4px 8px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '4px', fontSize: '12px' }}>
                  紧急
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>实现 GitHub 图床</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>优先级：中 | 分类：开发</div>
                </div>
                <span style={{ padding: '4px 8px', backgroundColor: '#dbeafe', color: '#2563eb', borderRadius: '4px', fontSize: '12px' }}>
                  中
                </span>
              </div>
            </div>
          </div>

          {/* 右侧栏 */}
          <div>
            {/* AI 建议 */}
            <div style={{ ...sectionStyle, marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>🤖 AI 建议</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>优先级分析</div>
                  <div style={{ fontSize: '13px', color: '#78716c' }}>
                    "集成 DeepSeek AI" 任务建议标记为紧急
                  </div>
                </div>

                <div style={{ padding: '12px', backgroundColor: '#dbeafe', borderRadius: '6px', borderLeft: '3px solid #3b82f6' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>分类建议</div>
                  <div style={{ fontSize: '13px', color: '#78716c' }}>
                    "实现 GitHub 图床" 可归类到 "工具开发"
                  </div>
                </div>
              </div>
            </div>

            {/* 快速操作 */}
            <div style={sectionStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>快速操作</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{ ...buttonStyle, backgroundColor: '#16a34a' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  新建任务
                </button>

                <Link href="/app/boards" style={{ ...buttonStyle, backgroundColor: '#9333ea', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  打开画板
                </Link>

                <Link href="/app/analytics" style={{ ...buttonStyle, backgroundColor: '#f59e0b', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  查看统计
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'

export default function BoardsPage() {
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

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
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

  const boardGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  }

  const boardCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  const placeholderStyle: React.CSSProperties = {
    height: '200px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    marginBottom: '12px',
    border: '2px dashed #d1d5db',
  }

  const boards = [
    { id: '1', title: '项目架构图', updated: '2小时前' },
    { id: '2', title: '用户流程图', updated: '1天前' },
    { id: '3', title: '系统设计稿', updated: '3天前' },
    { id: '4', title: '功能思维导图', updated: '1周前' },
    { id: '5', title: '会议记录草图', updated: '2周前' },
  ]

  return (
    <>
      {/* 侧边栏 */}
      <div style={sidebarStyle}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none', marginBottom: '24px' }}>
          ToDo 应用
        </Link>

        <Link href="/app" style={navItemStyle}>
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

        <Link href="/app/boards" style={{ ...navItemStyle, backgroundColor: '#dbeafe', color: '#2563eb' }}>
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
      </div>

      {/* 主内容区 */}
      <div style={containerStyle}>
        {/* 顶部栏 */}
        <div style={headerStyle}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>我的画板</h1>
          <button style={buttonStyle}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            新建画板
          </button>
        </div>

        {/* 画板网格 */}
        <div style={boardGridStyle}>
          {/* 新建画板卡片 */}
          <div style={{
            ...boardCardStyle,
            border: '2px dashed #d1d5db',
            backgroundColor: '#f9fafb',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            cursor: 'pointer',
          }}>
            <svg width="48" height="48" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24" style={{ marginBottom: '12px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <p style={{ color: '#6b7280', fontSize: '16px', fontWeight: '500' }}>创建新画板</p>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '4px' }}>开始绘制你的想法</p>
          </div>

          {/* 现有画板 */}
          {boards.map((board) => (
            <div key={board.id} style={boardCardStyle}>
              <div style={placeholderStyle}>
                <svg width="64" height="64" fill="none" stroke="#d1d5db" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{board.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>更新于 {board.updated}</p>
            </div>
          ))}
        </div>

        {/* 工具介绍 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>画板工具</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>涂鸦工具</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>自由绘制，释放创意</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>流程图</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>创建专业流程图</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <svg width="24" height="24" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '4px' }}>GitHub图床</h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>自动上传保存</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

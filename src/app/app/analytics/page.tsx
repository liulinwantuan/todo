'use client'

import Link from 'next/link'

export default function AnalyticsPage() {
  const containerStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    maxWidth: '1400px',
    margin: '0 auto',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
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

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px',
  }

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '24px',
  }

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }

  const chartPlaceholder: React.CSSProperties = {
    height: '300px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    border: '2px dashed #d1d5db',
    marginBottom: '16px',
  }

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

        <Link href="/app/boards" style={navItemStyle}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          我的画板
        </Link>

        <Link href="/app/analytics" style={{ ...navItemStyle, backgroundColor: '#dbeafe', color: '#2563eb' }}>
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
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>数据统计</h1>
          <p style={{ color: '#6b7280', fontSize: '16px', marginTop: '8px' }}>深入了解你的使用习惯</p>
        </div>

        {/* 统计卡片 */}
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>总任务数</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>156</div>
            <div style={{ color: '#16a34a', fontSize: '14px', marginTop: '8px' }}>↑ 比上月增加 12%</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>完成任务</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a' }}>124</div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>完成率 79.5%</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>活跃任务</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b' }}>32</div>
            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>正在进行</div>
          </div>

          <div style={statCardStyle}>
            <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>平均用时</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#9333ea' }}>2.5天</div>
            <div style={{ color: '#16a34a', fontSize: '14px', marginTop: '8px' }}>↓ 比上月减少 0.3天</div>
          </div>
        </div>

        {/* 图表区域 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* 任务完成趋势 */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>任务完成趋势</h2>
            <div style={chartPlaceholder}>
              <div style={{ textAlign: 'center' }}>
                <svg width="64" height="64" fill="none" stroke="#d1d5db" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: '0 auto 12px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p>任务完成趋势图</p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>(即将集成 Recharts 图表库)</p>
              </div>
            </div>
          </div>

          {/* 优先级分布 */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>优先级分布</h2>
            <div style={chartPlaceholder} style={{ height: '200px' }}>
              <div style={{ textAlign: 'center' }}>
                <p>优先级饼图</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* 分类统计 */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>分类统计</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                  <span style={{ fontSize: '14px' }}>开发</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>42</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                  <span style={{ fontSize: '14px' }}>工作</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>38</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <span style={{ fontSize: '14px' }}>个人</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>35</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9333ea' }} />
                  <span style={{ fontSize: '14px' }}>其他</span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>41</span>
              </div>
            </div>
          </div>

          {/* AI 洞察报告 */}
          <div style={sectionStyle}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>🤖 AI 洞察报告</h2>
            <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '6px', borderLeft: '3px solid #f59e0b', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>任务完成效率</h3>
              <p style={{ fontSize: '13px', color: '#78716c', lineHeight: '1.5' }}>
                你在周二的完成任务数量最多，建议将重要任务安排在周二进行。
              </p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#dbeafe', borderRadius: '6px', borderLeft: '3px solid #3b82f6', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>工作习惯分析</h3>
              <p style={{ fontSize: '13px', color: '#78716c', lineHeight: '1.5' }}>
                你更倾向于在下午处理高优先级任务，可以合理分配工作时间。
              </p>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '6px', borderLeft: '3px solid #16a34a' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>改进建议</h3>
              <p style={{ fontSize: '13px', color: '#78716c', lineHeight: '1.5' }}>
                建议减少"其他"分类的使用，更好地对任务进行分类管理。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

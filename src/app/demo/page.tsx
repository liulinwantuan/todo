'use client'

import Link from 'next/link'

export default function DemoPage() {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '24px',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
  }

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    marginRight: '8px',
  }

  const urgentBadge = { ...badgeStyle, backgroundColor: '#fee2e2', color: '#dc2626' }
  const highBadge = { ...badgeStyle, backgroundColor: '#fed7aa', color: '#ea580c' }
  const mediumBadge = { ...badgeStyle, backgroundColor: '#dbeafe', color: '#2563eb' }
  const lowBadge = { ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }
  const completedBadge = { ...badgeStyle, backgroundColor: '#dcfce7', color: '#16a34a' }

  const demoTodos = [
    {
      id: '1',
      title: '完成项目架构设计',
      content: '设计三个版本的技术架构和数据库结构',
      status: 'completed',
      priority: 'high',
      category: '工作',
      created_at: '2025-10-15',
    },
    {
      id: '2',
      title: '集成 DeepSeek AI',
      content: '实现智能优先级分析、分类建议等5大AI功能',
      status: 'active',
      priority: 'urgent',
      category: '开发',
      created_at: '2025-10-20',
    },
    {
      id: '3',
      title: '实现 GitHub 图床',
      content: '支持图片自动上传到 GitHub 仓库',
      status: 'active',
      priority: 'medium',
      category: '开发',
      created_at: '2025-10-22',
    },
    {
      id: '4',
      title: '创建画板功能',
      content: '简单涂鸦 + 流程图设计',
      status: 'active',
      priority: 'low',
      category: '功能',
      created_at: '2025-10-25',
    },
    {
      id: '5',
      title: '数据统计分析',
      content: '图表展示和 AI 洞察报告',
      status: 'active',
      priority: 'medium',
      category: '分析',
      created_at: '2025-10-28',
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return urgentBadge
      case 'high': return highBadge
      case 'medium': return mediumBadge
      case 'low': return lowBadge
      default: return mediumBadge
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return '紧急'
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
      default: return '未知'
    }
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none' }}>
              ToDo 应用
            </Link>
            <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>演示版</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>这是演示数据预览</span>
            <Link href="/app" style={{ ...badgeStyle, backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', padding: '8px 16px' }}>
              进入个人版
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* 统计卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div style={statCardStyle}>
            <div style={{ marginBottom: '8px', color: '#6b7280', fontSize: '14px' }}>总任务</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>5</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ marginBottom: '8px', color: '#6b7280', fontSize: '14px' }}>已完成</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#16a34a' }}>1</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ marginBottom: '8px', color: '#6b7280', fontSize: '14px' }}>进行中</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>4</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ marginBottom: '8px', color: '#6b7280', fontSize: '14px' }}>分类数</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#9333ea' }}>4</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* 任务列表 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>任务列表</h2>
              <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>共 {demoTodos.length} 个任务</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {demoTodos.map((todo) => (
                <div key={todo.id} style={{ ...cardStyle, cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{todo.title}</h3>
                      <span style={getPriorityBadge(todo.priority)}>{getPriorityText(todo.priority)}</span>
                      {todo.status === 'completed' && <span style={completedBadge}>已完成</span>}
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>{todo.content}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>{todo.category}</span>
                      <span style={{ fontSize: '14px', color: '#9ca3af' }}>{todo.created_at}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 侧边栏 */}
          <div>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>功能特性</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>任务管理</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>AI 智能助手</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>画板功能</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>GitHub 图床</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>数据统计</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span style={{ fontSize: '14px' }}>离线支持</span>
                </div>
              </div>
            </div>

            <div style={{ ...cardStyle, marginTop: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>分类统计</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                    <span style={{ fontSize: '14px' }}>工作</span>
                  </div>
                  <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                    <span style={{ fontSize: '14px' }}>开发</span>
                  </div>
                  <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>2</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9333ea' }} />
                    <span style={{ fontSize: '14px' }}>功能</span>
                  </div>
                  <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ea580c' }} />
                    <span style={{ fontSize: '14px' }}>分析</span>
                  </div>
                  <span style={{ ...badgeStyle, backgroundColor: '#f3f4f6', color: '#6b7280' }}>1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

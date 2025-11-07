'use client'

import Link from 'next/link'
import { Calendar, CheckSquare, Tag, Target, BarChart3, Zap } from 'lucide-react'

export default function Home() {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    padding: '64px 16px',
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.15)',
    border: '1px solid rgba(76, 175, 80, 0.1)',
    marginBottom: '16px',
  }

  const buttonStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: '14px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const features = [
    {
      icon: CheckSquare,
      title: '任务管理',
      desc: '创建、编辑、完成、删除任务，支持子任务和优先级'
    },
    {
      icon: Tag,
      title: '项目与标签',
      desc: '多项目支持，灵活标签分类，快速筛选任务'
    },
    {
      icon: Calendar,
      title: '日期提醒',
      desc: '截止日期、智能提醒、重复任务，从不遗忘'
    },
    {
      icon: Target,
      title: '番茄钟',
      desc: '25分钟专注计时器，提升工作效率'
    },
    {
      icon: BarChart3,
      title: '数据统计',
      desc: '完成趋势分析，习惯养成追踪'
    },
    {
      icon: Zap,
      title: '快速操作',
      desc: '快捷键支持，批量操作，高效管理'
    }
  ]

  return (
    <div style={containerStyle}>
      {/* 标题区域 */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: '#4CAF50', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '40px', 
            color: 'white', 
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
          }}>
            滴
          </div>
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#2E7D32', marginBottom: '16px' }}>
          滴答清单风格
        </h1>
        <p style={{ fontSize: '20px', color: '#558B2F', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          100% 模仿滴答清单功能和界面设计，基于 GTD 工作流，支持项目、标签、优先级、番茄钟等完整功能
        </p>
      </div>

      {/* CTA 按钮 */}
      <div style={{ maxWidth: '400px', margin: '0 auto 64px' }}>
        <Link href="/app" style={buttonStyle}>
          开始使用 →
        </Link>
        <Link href="/demo" style={{ ...buttonStyle, backgroundColor: 'white', color: '#4CAF50', marginTop: '12px', border: '2px solid #4CAF50' }}>
          查看演示
        </Link>
      </div>

      {/* 功能特性 */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', color: '#2E7D32' }}>
          核心功能
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ 
              ...cardStyle, 
              padding: '24px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(76, 175, 80, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.15)'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: '#E8F5E9', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px' 
              }}>
                <feature.icon size={24} color="#4CAF50" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#2E7D32' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 页脚 */}
      <div style={{ marginTop: '100px', textAlign: 'center', fontSize: '14px', color: '#81C784' }}>
        <p>基于 Next.js + TypeScript + Tailwind CSS 构建</p>
        <p style={{ marginTop: '8px' }}>© 2025 滴答清单风格应用. MIT License.</p>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTodos } from '@/hooks/use-todos'
import { CreateTodoInput, UpdateTodoInput } from '@/types/todo'
import TodoModal from '@/components/todo-modal'

export default function TodosPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const { todos, loading, createTodo, updateTodo, deleteTodo, toggleTodoStatus } = useTodos()

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

  const filterButton = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: active ? '#3b82f6' : '#f3f4f6',
    color: active ? 'white' : '#374151',
    marginRight: '8px',
  })

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '16px',
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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return todo.status === 'active'
    if (filter === 'completed') return todo.status === 'completed'
    return true
  }).filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getPriorityStyle = (priority: string): React.CSSProperties => {
    switch (priority) {
      case 'urgent': return { backgroundColor: '#fee2e2', color: '#dc2626' }
      case 'high': return { backgroundColor: '#fed7aa', color: '#ea580c' }
      case 'medium': return { backgroundColor: '#dbeafe', color: '#2563eb' }
      case 'low': return { backgroundColor: '#f3f4f6', color: '#6b7280' }
      default: return { backgroundColor: '#f3f4f6', color: '#6b7280' }
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

  const handleCreateTodo = async (input: CreateTodoInput | UpdateTodoInput) => {
    const result = await createTodo(input as CreateTodoInput)
    return result
  }

  const handleUpdateTodo = async (input: CreateTodoInput | UpdateTodoInput) => {
    if (!editingTodo) return { success: false, error: '没有选中任务' }
    const result = await updateTodo(editingTodo.id, input as UpdateTodoInput)
    return result
  }

  const handleToggleStatus = async (id: string) => {
    await toggleTodoStatus(id)
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这个任务吗？')) {
      await deleteTodo(id)
    }
  }

  const openEditModal = (todo: any) => {
    setEditingTodo(todo)
    setModalOpen(true)
  }

  const openCreateModal = () => {
    setEditingTodo(null)
    setModalOpen(true)
  }

  if (loading) {
    return (
      <>
        <div style={sidebarStyle}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', textDecoration: 'none', marginBottom: '24px' }}>
            ToDo 应用
          </Link>
        </div>
        <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>加载中...</div>
          </div>
        </div>
      </>
    )
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

        <Link href="/app/todos" style={{ ...navItemStyle, backgroundColor: '#dbeafe', color: '#2563eb' }}>
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
      </div>

      {/* 主内容区 */}
      <div style={containerStyle}>
        {/* 顶部栏 */}
        <div style={headerStyle}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>任务管理</h1>
          <button style={buttonStyle} onClick={openCreateModal}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: 'inline', marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            新建任务
          </button>
        </div>

        {/* 搜索和筛选 */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="搜索任务..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '10px 16px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px'
            }}
          />
          <div>
            <button style={filterButton(filter === 'all')} onClick={() => setFilter('all')}>
              全部 ({todos.length})
            </button>
            <button style={filterButton(filter === 'active')} onClick={() => setFilter('active')}>
              进行中 ({todos.filter(t => t.status === 'active').length})
            </button>
            <button style={filterButton(filter === 'completed')} onClick={() => setFilter('completed')}>
              已完成 ({todos.filter(t => t.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* 任务列表 */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredTodos.map((todo) => (
            <div key={todo.id} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input
                  type="checkbox"
                  checked={todo.status === 'completed'}
                  onChange={() => handleToggleStatus(todo.id)}
                  style={{ width: '20px', height: '20px' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', textDecoration: todo.status === 'completed' ? 'line-through' : 'none', color: todo.status === 'completed' ? '#9ca3af' : '#111827' }}>
                    {todo.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6b7280' }}>
                    <span>分类：{todo.category}</span>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', ...getPriorityStyle(todo.priority) }}>
                      {getPriorityText(todo.priority)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(todo)}
                  style={{ padding: '8px 12px', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#374156', marginRight: '8px' }}
                >
                  编辑
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{ padding: '8px 12px', backgroundColor: '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: '#dc2626' }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 24px', color: '#9ca3af' }}>
            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>没有找到匹配的任务</p>
          </div>
        )}
      </div>

      <TodoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
        todo={editingTodo}
        mode={editingTodo ? 'edit' : 'create'}
      />
    </>
  )
}

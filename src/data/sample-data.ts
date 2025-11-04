export const sampleTodos = [
  {
    title: '完成项目架构设计',
    description: '设计系统的整体架构，包括数据库设计、API设计、前端架构等',
    category: '工作',
    priority: 'high' as const,
    status: 'completed' as const,
  },
  {
    title: '集成 DeepSeek AI',
    description: '在任务管理页面集成 DeepSeek AI，实现智能分析和推荐功能',
    category: '开发',
    priority: 'urgent' as const,
    status: 'active' as const,
  },
  {
    title: '实现 GitHub 图床',
    description: '使用 GitHub 作为图片存储，实现图片上传和 CDN 加速',
    category: '开发',
    priority: 'medium' as const,
    status: 'active' as const,
  },
  {
    title: '创建画板功能',
    description: '实现基于 HTML5 Canvas 的画板功能，支持涂鸦和流程图绘制',
    category: '功能',
    priority: 'low' as const,
    status: 'active' as const,
  },
  {
    title: '数据统计分析',
    description: '使用 Recharts 实现可视化图表，展示任务完成趋势和统计信息',
    category: '分析',
    priority: 'medium' as const,
    status: 'active' as const,
  },
  {
    title: '实现用户认证系统',
    description: '使用 Supabase Auth 实现完整的用户认证和授权系统',
    category: '开发',
    priority: 'high' as const,
    status: 'completed' as const,
  },
  {
    title: '优化页面响应式设计',
    description: '改进移动端和桌面端的适配效果',
    category: '功能',
    priority: 'low' as const,
    status: 'active' as const,
  },
  {
    title: '编写项目文档',
    description: '编写详细的 README、SETUP 文档和 API 文档',
    category: '工作',
    priority: 'medium' as const,
    status: 'completed' as const,
  },
]

export const getSampleTodos = (userId: string) => {
  return sampleTodos.map((todo, index) => ({
    id: `sample-${index + 1}`,
    user_id: userId,
    ...todo,
    created_at: new Date(Date.now() - index * 86400000).toISOString(),
    updated_at: new Date(Date.now() - index * 86400000).toISOString(),
    due_date: index % 3 === 0 ? new Date(Date.now() + (index + 1) * 86400000).toISOString() : null,
  }))
}

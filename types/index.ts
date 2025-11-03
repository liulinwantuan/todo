// 用户相关类型
export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  user_type: 'demo' | 'personal' | 'guest'
  created_at: string
  updated_at: string
}

// 分类/标签类型
export interface Category {
  id: string
  user_id: string
  name: string
  color: string
  icon: string | null
  created_at: string
}

// 任务类型
export interface Todo {
  id: string
  user_id: string
  title: string
  content: string | null
  status: 'active' | 'completed' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category_id: string | null
  category?: Category
  completed_at: string | null
  archived_at: string | null
  ai_priority_suggestion: string | null
  ai_category_suggestion: string | null
  ai_summary: string | null
  created_at: string
  updated_at: string
}

// 画板类型
export interface Board {
  id: string
  user_id: string
  title: string
  canvas_data: any
  thumbnail_url: string | null
  created_at: string
  updated_at: string
}

// 附件类型
export interface Attachment {
  id: string
  user_id: string
  todo_id: string | null
  board_id: string | null
  filename: string
  file_type: string
  file_size: number
  github_url: string
  github_path: string
  created_at: string
}

// 提醒类型
export interface Reminder {
  id: string
  user_id: string
  todo_id: string
  reminder_date: string
  reminder_type: 'once' | 'daily' | 'weekly' | 'monthly'
  is_sent: boolean
  created_at: string
}

// 快速记录类型
export interface QuickNote {
  id: string
  user_id: string
  content: string
  is_synced: boolean
  created_at: string
}

// 用户统计数据类型
export interface UserAnalytics {
  id: string
  user_id: string
  date: string
  todos_completed: number
  todos_created: number
  time_spent_minutes: number
  created_at: string
}

// AI相关类型
export interface AIPrioritySuggestion {
  priority: 'low' | 'medium' | 'high' | 'urgent'
  reason: string
}

export interface AICategorySuggestion {
  category_id: string
  category_name: string
  confidence: number
}

export interface SearchFilters {
  status?: 'active' | 'completed' | 'archived'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  category_id?: string
  dateRange?: 'today' | 'yesterday' | 'lastWeek' | 'lastMonth' | 'custom'
  startDate?: string
  endDate?: string
  searchQuery?: string
}

// 画板数据类型
export interface FlowNode {
  id: string
  type: 'start' | 'process' | 'decision' | 'end'
  text: string
  x: number
  y: number
  width: number
  height: number
}

export interface Connection {
  id: string
  from: string
  to: string
}

export interface CanvasData {
  nodes: FlowNode[]
  connections: Connection[]
  metadata: {
    version: '1.0'
    createdAt: number
  }
}

// 同步队列类型
export interface SyncAction {
  type: 'create' | 'update' | 'delete'
  table: string
  data: any
  timestamp: number
}

// 用户设置类型
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  autoArchive: boolean
  autoSync: boolean
  aiEnabled: boolean
}

// DeepSeek API类型
export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
  }>
}

// GitHub上传类型
export interface GitHubUploadConfig {
  token: string
  owner: string
  repo: string
  branch: string
}

export interface GitHubUploadResponse {
  content: {
    sha: string
    path: string
  }
  commit: {
    sha: string
  }
}

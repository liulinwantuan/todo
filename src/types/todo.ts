export type Priority = 'urgent' | 'high' | 'medium' | 'low'
export type Status = 'active' | 'completed'

export interface Todo {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string
  priority: Priority
  status: Status
  created_at: string
  updated_at: string
  due_date: string | null
}

export interface CreateTodoInput {
  title: string
  description?: string
  category: string
  priority?: Priority
  due_date?: string | null
}

export interface UpdateTodoInput {
  title?: string
  description?: string
  category?: string
  priority?: Priority
  status?: Status
  due_date?: string | null
}

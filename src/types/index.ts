export type Priority = 'urgent' | 'high' | 'medium' | 'low'
export type TaskStatus = 'active' | 'completed' | 'archived'
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
export type RecurrenceEndType = 'never' | 'after_count' | 'by_date'
export type ViewType = 'list' | 'board' | 'calendar'
export type ThemeMode = 'light' | 'dark'

export interface Label {
  id: string
  user_id: string
  name: string
  color: string
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  color: string
  icon?: string
  sort_order: number
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  project_id?: string | null
  title: string
  description?: string | null
  status: TaskStatus
  priority: Priority
  due_date?: string | null
  is_favorite: boolean
  sort_order: number
  completed_at?: string | null
  created_at: string
  updated_at: string
  // Relations
  labels?: Label[]
  subtasks?: Subtask[]
  reminder?: Reminder
  recurrence?: Recurrence
}

export interface Subtask {
  id: string
  task_id: string
  title: string
  is_completed: boolean
  sort_order: number
  created_at: string
}

export interface Reminder {
  id: string
  task_id: string
  remind_at: string
  is_sent: boolean
  created_at: string
}

export interface Recurrence {
  id: string
  task_id: string
  frequency: RecurrenceFrequency
  interval: number
  end_type: RecurrenceEndType
  end_count?: number | null
  end_date?: string | null
  created_at: string
}

export interface FocusSession {
  id: string
  user_id: string
  task_id?: string | null
  duration_minutes: number
  started_at: string
  completed_at?: string | null
}

export interface CreateTaskInput {
  title: string
  description?: string
  project_id?: string | null
  priority?: Priority
  due_date?: string | null
  label_ids?: string[]
  subtasks?: string[]
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  project_id?: string | null
  status?: TaskStatus
  priority?: Priority
  due_date?: string | null
  is_favorite?: boolean
  label_ids?: string[]
}

export interface CreateProjectInput {
  name: string
  color?: string
  icon?: string
}

export interface CreateLabelInput {
  name: string
  color: string
}

export interface FilterOptions {
  project_id?: string | null
  label_ids?: string[]
  priority?: Priority
  status?: TaskStatus
  due_date?: 'today' | 'overdue' | 'upcoming' | 'none'
  search?: string
}

export interface TaskListProps {
  tasks: Task[]
  viewType?: ViewType
  onToggleComplete?: (taskId: string) => void
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
  onReorder?: (startIndex: number, endIndex: number) => void
}

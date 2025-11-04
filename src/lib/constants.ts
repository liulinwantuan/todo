export const TODO_CATEGORIES = [
  '工作',
  '开发',
  '个人',
  '功能',
  '分析',
  '其他',
] as const

export const TODO_PRIORITIES = [
  'urgent',
  'high',
  'medium',
  'low',
] as const

export const TODO_STATUSES = ['active', 'completed'] as const

export const PRIORITY_LABELS = {
  urgent: '紧急',
  high: '高',
  medium: '中',
  low: '低',
} as const

export const STATUS_LABELS = {
  active: '进行中',
  completed: '已完成',
} as const

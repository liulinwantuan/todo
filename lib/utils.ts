import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化日期
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 格式化相对时间
export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return '刚刚'
}

// 获取优先级颜色
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500 text-white'
    case 'high':
      return 'bg-orange-500 text-white'
    case 'medium':
      return 'bg-blue-500 text-white'
    case 'low':
      return 'bg-gray-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

// 获取优先级文本
export function getPriorityText(priority: string): string {
  switch (priority) {
    case 'urgent':
      return '紧急'
    case 'high':
      return '高'
    case 'medium':
      return '中'
    case 'low':
      return '低'
    default:
      return '未知'
  }
}

// 获取状态颜色
export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-500 text-white'
    case 'archived':
      return 'bg-gray-400 text-white'
    case 'active':
      return 'bg-blue-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

// 获取状态文本
export function getStatusText(status: string): string {
  switch (status) {
    case 'completed':
      return '已完成'
    case 'archived':
      return '已归档'
    case 'active':
      return '进行中'
    default:
      return '未知'
  }
}

// 截断文本
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// 防抖函数
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 文件大小格式化
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// 生成随机ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

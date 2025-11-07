'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Inbox, Calendar, CalendarDays, FolderKanban, Tags, Target, TrendingUp, Plus, Settings } from 'lucide-react'

const navigation = [
  { name: '收集箱', href: '/app/inbox', icon: Inbox },
  { name: '今日', href: '/app/today', icon: Calendar },
  { name: '即将到期', href: '/app/upcoming', icon: CalendarDays },
  { name: '项目', href: '/app/projects', icon: FolderKanban },
  { name: '标签', href: '/app/labels', icon: Tags },
  { name: '专注', href: '/app/focus', icon: Target },
  { name: '统计', href: '/app/analytics', icon: TrendingUp },
]

export default function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-50 border-r border-gray-200">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-200">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-green-500 text-white font-bold">
          滴
        </div>
        <span className="text-xl font-semibold text-gray-900">滴答清单</span>
      </div>

      <div className="p-4">
        <button className="flex w-full items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-white hover:bg-green-600">
          <Plus size={18} />
          <span className="font-medium">快速添加任务</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Link
          href="/app/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <Settings size={20} />
          <span>设置</span>
        </Link>
      </div>
    </div>
  )
}

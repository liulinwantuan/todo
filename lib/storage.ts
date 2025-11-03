import type { QuickNote, UserSettings, SyncAction } from '@/types'

const QUICK_NOTES_KEY = 'quick_notes'
const USER_SETTINGS_KEY = 'user_settings'
const SYNC_QUEUE_KEY = 'sync_queue'

// 快速记录（仅本地存储）
export const quickNoteStorage = {
  save(content: string) {
    const data = {
      content,
      timestamp: Date.now(),
      synced: false,
    }
    localStorage.setItem(QUICK_NOTES_KEY, JSON.stringify(data))
  },

  get(): QuickNote | null {
    const data = localStorage.getItem(QUICK_NOTES_KEY)
    if (!data) return null

    try {
      const parsed = JSON.parse(data)
      return {
        id: 'local',
        user_id: 'local',
        content: parsed.content,
        is_synced: parsed.synced,
        created_at: new Date(parsed.timestamp).toISOString(),
      }
    } catch (error) {
      console.error('Error parsing quick note:', error)
      return null
    }
  },

  clear() {
    localStorage.removeItem(QUICK_NOTES_KEY)
  },
}

// 用户设置（本地优先）
export const settingsStorage = {
  save(settings: UserSettings) {
    localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings))
  },

  get(): UserSettings {
    const data = localStorage.getItem(USER_SETTINGS_KEY)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        console.error('Error parsing settings:', error)
      }
    }

    // 默认设置
    return {
      theme: 'system',
      language: 'zh-CN',
      autoArchive: true,
      autoSync: true,
      aiEnabled: true,
    }
  },
}

// 同步队列
export const syncQueue = {
  add(action: Omit<SyncAction, 'timestamp'>) {
    const queue = this.getQueue()
    queue.push({
      ...action,
      timestamp: Date.now(),
    })
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue))
  },

  getQueue(): SyncAction[] {
    const data = localStorage.getItem(SYNC_QUEUE_KEY)
    if (!data) return []

    try {
      return JSON.parse(data)
    } catch (error) {
      console.error('Error parsing sync queue:', error)
      return []
    }
  },

  async process(processor: (action: SyncAction) => Promise<void>) {
    const queue = this.getQueue()
    const processed: number[] = []

    for (let i = 0; i < queue.length; i++) {
      try {
        await processor(queue[i])
        processed.push(i)
      } catch (error) {
        console.error('Error processing sync action:', error)
        // 如果处理失败，保留在队列中
      }
    }

    // 移除已处理的项目
    if (processed.length > 0) {
      const remainingQueue = queue.filter((_, index) => !processed.includes(index))
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(remainingQueue))
    }
  },

  clear() {
    localStorage.removeItem(SYNC_QUEUE_KEY)
  },
}

// IndexedDB缓存（离线数据）
export const offlineCache = {
  dbName: 'todo_app_cache',
  version: 1,

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // 创建todos缓存
        if (!db.objectStoreNames.contains('todos')) {
          const todosStore = db.createObjectStore('todos', { keyPath: 'id' })
          todosStore.createIndex('user_id', 'user_id', { unique: false })
          todosStore.createIndex('status', 'status', { unique: false })
        }

        // 创建boards缓存
        if (!db.objectStoreNames.contains('boards')) {
          const boardsStore = db.createObjectStore('boards', { keyPath: 'id' })
          boardsStore.createIndex('user_id', 'user_id', { unique: false })
        }
      }
    })
  },

  async saveTodos(todos: any[]) {
    const db = await this.getDB()
    const transaction = db.transaction(['todos'], 'readwrite')
    const store = transaction.objectStore('todos')

    await Promise.all(todos.map((todo) => store.put(todo)))
  },

  async getTodos(userId: string): Promise<any[]> {
    const db = await this.getDB()
    const transaction = db.transaction(['todos'], 'readonly')
    const store = transaction.objectStore('todos')
    const index = store.index('user_id')

    return new Promise((resolve, reject) => {
      const request = index.getAll(userId)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  },

  async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  },
}

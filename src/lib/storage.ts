/**
 * 本地存储管理类
 */
class LocalStorage {
  /**
   * 设置存储项
   * @param key - 键名
   * @param value - 值
   */
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return

    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  /**
   * 获取存储项
   * @param key - 键名
   * @param defaultValue - 默认值
   * @returns 存储的值或默认值
   */
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  }

  /**
   * 删除存储项
   * @param key - 键名
   */
  remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }

  /**
   * 清空所有存储
   */
  clear(): void {
    if (typeof window === 'undefined') return
    localStorage.clear()
  }

  /**
   * 获取所有键名
   * @returns 键名数组
   */
  keys(): string[] {
    if (typeof window === 'undefined') return []
    return Object.keys(localStorage)
  }
}

/**
 * 单例实例
 */
export const storage = new LocalStorage()

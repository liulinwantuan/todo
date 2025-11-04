import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo'

export function useTodos() {
  const { user } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      if (!user) {
        setTodos([])
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      setTodos(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [user])

  const createTodo = async (input: CreateTodoInput): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!user) {
        return { success: false, error: '用户未登录' }
      }

      const { data, error } = await supabase
        .from('todos')
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description || null,
          category: input.category,
          priority: input.priority || 'medium',
          due_date: input.due_date || null,
        })
        .select()
        .single()

      if (error) throw error

      setTodos((prev) => [data, ...prev])
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const updateTodo = async (id: string, input: UpdateTodoInput): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setTodos((prev) => prev.map((todo) => (todo.id === id ? data : todo)))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const deleteTodo = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTodos((prev) => prev.filter((todo) => todo.id !== id))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const toggleTodoStatus = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const todo = todos.find((t) => t.id === id)
      if (!todo) {
        return { success: false, error: '任务不存在' }
      }

      const newStatus = todo.status === 'active' ? 'completed' : 'active'

      return await updateTodo(id, { status: newStatus })
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    refetch: fetchTodos,
  }
}

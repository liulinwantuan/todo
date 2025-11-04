import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo'

export function useTodos() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const todosQuery = useQuery({
    queryKey: ['todos', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Todo[]
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const createTodoMutation = useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase
        .from('todos')
        .insert({
          user_id: user.id,
          ...input,
        })
        .select()
        .single()

      if (error) throw error
      return data as Todo
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, ...input }: { id: string } & UpdateTodoInput) => {
      const { data, error } = await supabase
        .from('todos')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Todo
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['todos', user?.id], (old: Todo[] | undefined) => {
        if (!old) return old
        return old.map(todo => (todo.id === data.id ? data : todo))
      })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const todo = todosQuery.data?.find(t => t.id === id)
      if (!todo) throw new Error('Todo not found')

      const newStatus = todo.status === 'active' ? 'completed' : 'active'
      
      const { data, error } = await supabase
        .from('todos')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Todo
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['todos', user?.id], (old: Todo[] | undefined) => {
        if (!old) return old
        return old.map(todo => (todo.id === data.id ? data : todo))
      })
    },
  })

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    error: todosQuery.error,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    isCreating: createTodoMutation.isPending,
    isUpdating: updateTodoMutation.isPending,
    isDeleting: deleteTodoMutation.isPending,
    isToggling: toggleTodoMutation.isPending,
  }
}

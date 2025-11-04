export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          priority: 'urgent' | 'high' | 'medium' | 'low'
          status: 'active' | 'completed'
          created_at: string
          updated_at: string
          due_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          priority?: 'urgent' | 'high' | 'medium' | 'low'
          status?: 'active' | 'completed'
          created_at?: string
          updated_at?: string
          due_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string
          priority?: 'urgent' | 'high' | 'medium' | 'low'
          status?: 'active' | 'completed'
          created_at?: string
          updated_at?: string
          due_date?: string | null
        }
      }
      boards: {
        Row: {
          id: string
          user_id: string
          title: string
          data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          data?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      priority: 'urgent' | 'high' | 'medium' | 'low'
      status: 'active' | 'completed'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          user_type: 'demo' | 'personal' | 'guest'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          user_type?: 'demo' | 'personal' | 'guest'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          user_type?: 'demo' | 'personal' | 'guest'
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          icon?: string | null
          created_at?: string
        }
      }
      todos: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string | null
          status: 'active' | 'completed' | 'archived'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          category_id: string | null
          completed_at: string | null
          archived_at: string | null
          ai_priority_suggestion: string | null
          ai_category_suggestion: string | null
          ai_summary: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content?: string | null
          status?: 'active' | 'completed' | 'archived'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category_id?: string | null
          completed_at?: string | null
          archived_at?: string | null
          ai_priority_suggestion?: string | null
          ai_category_suggestion?: string | null
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string | null
          status?: 'active' | 'completed' | 'archived'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          category_id?: string | null
          completed_at?: string | null
          archived_at?: string | null
          ai_priority_suggestion?: string | null
          ai_category_suggestion?: string | null
          ai_summary?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          user_id: string
          title: string
          canvas_data: Json | null
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          canvas_data?: Json | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          canvas_data?: Json | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attachments: {
        Row: {
          id: string
          user_id: string
          todo_id: string | null
          board_id: string | null
          filename: string
          file_type: string
          file_size: number
          github_url: string
          github_path: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          todo_id?: string | null
          board_id?: string | null
          filename: string
          file_type: string
          file_size: number
          github_url: string
          github_path: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          todo_id?: string | null
          board_id?: string | null
          filename?: string
          file_type?: string
          file_size?: number
          github_url?: string
          github_path?: string
          created_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          user_id: string
          todo_id: string
          reminder_date: string
          reminder_type: 'once' | 'daily' | 'weekly' | 'monthly'
          is_sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          todo_id: string
          reminder_date: string
          reminder_type?: 'once' | 'daily' | 'weekly' | 'monthly'
          is_sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          todo_id?: string
          reminder_date?: string
          reminder_type?: 'once' | 'daily' | 'weekly' | 'monthly'
          is_sent?: boolean
          created_at?: string
        }
      }
      quick_notes: {
        Row: {
          id: string
          user_id: string
          content: string
          is_synced: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          is_synced?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          is_synced?: boolean
          created_at?: string
        }
      }
      user_analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          todos_completed: number
          todos_created: number
          time_spent_minutes: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          todos_completed?: number
          todos_created?: number
          time_spent_minutes?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          todos_completed?: number
          todos_created?: number
          time_spent_minutes?: number
          created_at?: string
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
      [_ in never]: never
    }
  }
}

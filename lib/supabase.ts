import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// 辅助函数：获取当前用户
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// 辅助函数：获取当前用户档案
export async function getCurrentProfile() {
  const user = await getCurrentUser()
  if (!user) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return profile
}

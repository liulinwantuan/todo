export interface Project {
  id: string
  user_id: string
  name: string
  color: string
  icon?: string
  sort_order: number
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface CreateProjectInput {
  name: string
  color?: string
  icon?: string
}

export interface UpdateProjectInput {
  name?: string
  color?: string
  icon?: string
  sort_order?: number
  is_archived?: boolean
}

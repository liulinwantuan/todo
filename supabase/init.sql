-- =====================================================
-- ToDo App 数据库初始化脚本
-- 版本: 1.0
-- 日期: 2025-11-03
-- =====================================================

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. 用户档案表 (扩展 auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('demo', 'personal', 'guest')) DEFAULT 'personal',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. 分类/标签表
-- =====================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. 任务表 (核心)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  status TEXT CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  category_id UUID REFERENCES public.categories(id),
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  ai_priority_suggestion TEXT,
  ai_category_suggestion UUID,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. 画板表
-- =====================================================
CREATE TABLE IF NOT EXISTS public.boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  canvas_data JSONB,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. 附件表 (图片/文件)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  todo_id UUID REFERENCES public.todos(id) ON DELETE CASCADE,
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  github_url TEXT NOT NULL,
  github_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. 提醒表
-- =====================================================
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  todo_id UUID REFERENCES public.todos(id) ON DELETE CASCADE NOT NULL,
  reminder_date TIMESTAMPTZ NOT NULL,
  reminder_type TEXT CHECK (reminder_type IN ('once', 'daily', 'weekly', 'monthly')) DEFAULT 'once',
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. 快速记录表 (仅本地存储的文本)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.quick_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_synced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. 统计数据表 (用户习惯分析)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  todos_completed INTEGER DEFAULT 0,
  todos_created INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- =====================================================
-- 创建索引优化查询性能
-- =====================================================

-- profiles表索引
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON public.profiles(user_type);

-- categories表索引
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON public.categories(user_id);

-- todos表索引
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON public.todos(user_id);
CREATE INDEX IF NOT EXISTS idx_todos_user_status ON public.todos(user_id, status);
CREATE INDEX IF NOT EXISTS idx_todos_user_priority ON public.todos(user_id, priority);
CREATE INDEX IF NOT EXISTS idx_todos_completed_at ON public.todos(user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_todos_category_id ON public.todos(category_id);

-- boards表索引
CREATE INDEX IF NOT EXISTS idx_boards_user_id ON public.boards(user_id);
CREATE INDEX IF NOT EXISTS idx_boards_updated_at ON public.boards(user_id, updated_at DESC);

-- attachments表索引
CREATE INDEX IF NOT EXISTS idx_attachments_user_id ON public.attachments(user_id);
CREATE INDEX IF NOT EXISTS idx_attachments_todo_id ON public.attachments(todo_id);
CREATE INDEX IF NOT EXISTS idx_attachments_board_id ON public.attachments(board_id);

-- reminders表索引
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_todo_id ON public.reminders(todo_id);
CREATE INDEX IF NOT EXISTS idx_reminders_date ON public.reminders(reminder_date);

-- quick_notes表索引
CREATE INDEX IF NOT EXISTS idx_quick_notes_user_id ON public.quick_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_quick_notes_created_at ON public.quick_notes(user_id, created_at DESC);

-- user_analytics表索引
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON public.user_analytics(user_id, date DESC);

-- =====================================================
-- 创建更新时间触发器函数
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 为需要的表添加更新时间触发器
-- =====================================================
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS update_todos_updated_at ON public.todos;
CREATE TRIGGER update_todos_updated_at
  BEFORE UPDATE ON public.todos
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS update_boards_updated_at ON public.boards;
CREATE TRIGGER update_boards_updated_at
  BEFORE UPDATE ON public.boards
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- =====================================================
-- 创建用户注册触发器函数
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'personal')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 用户注册时自动创建profile
-- =====================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- 任务完成/归档时自动更新时间戳
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_todo_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- 如果状态从其他变为 completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  END IF;

  -- 如果状态从其他变为 archived
  IF NEW.status = 'archived' AND OLD.status != 'archived' THEN
    NEW.archived_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_todo_status_change ON public.todos;
CREATE TRIGGER on_todo_status_change
  BEFORE UPDATE ON public.todos
  FOR EACH ROW EXECUTE PROCEDURE public.handle_todo_status_change();

-- =====================================================
-- 启用行级安全策略 (RLS)
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS 策略：用户只能访问自己的数据
-- =====================================================

-- profiles 策略
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- categories 策略
CREATE POLICY "Users can view own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories" ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories" ON public.categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories" ON public.categories
  FOR DELETE USING (auth.uid() = user_id);

-- todos 策略
CREATE POLICY "Users can view own todos" ON public.todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own todos" ON public.todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own todos" ON public.todos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own todos" ON public.todos
  FOR DELETE USING (auth.uid() = user_id);

-- boards 策略
CREATE POLICY "Users can view own boards" ON public.boards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own boards" ON public.boards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own boards" ON public.boards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own boards" ON public.boards
  FOR DELETE USING (auth.uid() = user_id);

-- attachments 策略
CREATE POLICY "Users can view own attachments" ON public.attachments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attachments" ON public.attachments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attachments" ON public.attachments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own attachments" ON public.attachments
  FOR DELETE USING (auth.uid() = user_id);

-- reminders 策略
CREATE POLICY "Users can view own reminders" ON public.reminders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reminders" ON public.reminders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reminders" ON public.reminders
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders" ON public.reminders
  FOR DELETE USING (auth.uid() = user_id);

-- quick_notes 策略
CREATE POLICY "Users can view own quick_notes" ON public.quick_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quick_notes" ON public.quick_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quick_notes" ON public.quick_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own quick_notes" ON public.quick_notes
  FOR DELETE USING (auth.uid() = user_id);

-- user_analytics 策略
CREATE POLICY "Users can view own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics" ON public.user_analytics
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 创建演示数据 (可选)
-- =====================================================

-- 创建演示用户ID (实际使用时请替换为真实UUID)
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
-- VALUES ('00000000-0000-0000-0000-000000000001', 'demo@example.com', '$2a$10$...', NOW(), NOW(), NOW())
-- ON CONFLICT (id) DO NOTHING;

-- 插入演示分类 (如果演示用户存在)
-- INSERT INTO public.categories (user_id, name, color, icon)
-- VALUES
--   ('00000000-0000-0000-0000-000000000001', '工作', '#3B82F6', 'briefcase'),
--   ('00000000-0000-0000-0000-000000000001', '开发', '#16A34A', 'code'),
--   ('00000000-0000-0000-0000-000000000001', '个人', '#F59E0B', 'user'),
--   ('00000000-0000-0000-0000-000000000001', '学习', '#9333EA', 'book')
-- ON CONFLICT DO NOTHING;

-- =====================================================
-- 完成提示
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '数据库初始化完成！';
  RAISE NOTICE '已创建表: profiles, categories, todos, boards, attachments, reminders, quick_notes, user_analytics';
  RAISE NOTICE '已启用 RLS 安全策略';
  RAISE NOTICE '已创建索引优化查询';
  RAISE NOTICE '已设置触发器自动更新时间戳';
END $$;

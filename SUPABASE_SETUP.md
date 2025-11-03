# Supabase 数据库配置指南

## 📋 准备工作

### 1. 注册 Supabase 账号
- 访问：https://supabase.com
- 点击 "Start your project"
- 使用 GitHub 账号登录

### 2. 创建新项目
1. 点击 "New Project"
2. 选择组织（个人账号直接创建）
3. 填写项目信息：
   - **Name**: `todo-app`
   - **Database Password**: 设置一个强密码（记住它！）
   - **Region**: 选择离你最近的区域
4. 点击 "Create new project"
5. **等待 1-2 分钟项目初始化完成**

### 3. 获取项目配置信息
项目创建完成后，进入项目仪表板：

1. 点击左侧菜单 **Settings** → **API**
2. 复制以下信息：
   - **Project URL** (格式: `https://xxx.supabase.co`)
   - **anon public** API Key
   - **service_role** API Key (保密，不要泄露)

## 🗄️ 数据库设置

### 方法 1：通过 SQL Editor (推荐)

1. 在 Supabase 仪表板，点击左侧菜单 **SQL Editor**
2. 点击 **New query**
3. 复制 `supabase/init.sql` 文件中的所有内容
4. 粘贴到 SQL Editor 中
5. 点击 **Run** 执行
6. 看到 "Success. No rows returned" 表示成功

### 方法 2：通过 SQL 文件上传

1. 在 Supabase 仪表板，点击左侧菜单 **SQL Editor**
2. 点击 **New query**
3. 点击 **Upload file**
4. 选择 `supabase/init.sql` 文件
5. 点击 **Run**

### 验证数据库创建成功

在 SQL Editor 中运行以下查询：

```sql
-- 查看所有表
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- 应该看到以下 8 个表：
-- profiles
-- categories
-- todos
-- boards
-- attachments
-- reminders
-- quick_notes
-- user_analytics
```

## ⚙️ 配置认证

### 设置 Auth URL

1. 进入 **Settings** → **Authentication**
2. 在 **Site URL** 部分：
   - 开发环境：`http://localhost:3000`
   - 生产环境：`https://your-domain.com`
3. 在 **Redirect URLs** 中添加：
   - `http://localhost:3000/**`
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/**` (生产环境)

### 配置邮件模板 (可选)

1. 在 **Authentication** 页面，点击 **Email Templates**
2. 可以自定义：
   - Confirmation signup (确认注册邮件)
   - Reset password (重置密码邮件)
   - Magic Link (魔法链接邮件)

## 🔐 Row Level Security (RLS) 状态检查

在 SQL Editor 中运行：

```sql
-- 检查 RLS 是否已启用
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- 应该所有表都返回 true
```

## 📝 创建演示数据 (可选)

如果需要在演示版 (`/demo`) 中展示虚拟数据，可以手动插入：

```sql
-- 注意：这里使用固定 UUID，实际中请使用真实的 auth.users UUID
-- 创建演示用户 (模拟)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'demo@example.com',
  '$2a$10$example.hash.here',
  NOW(),
  NOW(),
  NOW(),
  '{"username": "demo", "user_type": "demo"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 创建演示分类
INSERT INTO public.categories (user_id, name, color, icon)
VALUES
  ('00000000-0000-0000-0000-000000000001', '工作', '#3B82F6', 'briefcase'),
  ('00000000-0000-0000-0000-000000000001', '开发', '#16A34A', 'code'),
  ('00000000-0000-0000-0000-000000000001', '功能', '#9333EA', 'sparkles'),
  ('00000000-0000-0000-0000-000000000001', '分析', '#F59E0B', 'chart')
ON CONFLICT DO NOTHING;

-- 获取分类 ID 用于后续插入
WITH category_ids AS (
  SELECT id as category_id, name FROM public.categories
  WHERE user_id = '00000000-0000-0000-0000-000000000001'
)
-- 创建演示任务
INSERT INTO public.todos (user_id, title, content, status, priority, category_id)
SELECT
  '00000000-0000-0000-0000-000000000001',
  todo.title,
  todo.content,
  todo.status,
  todo.priority,
  c.id
FROM (VALUES
  ('完成项目架构设计', '设计三个版本的技术架构和数据库结构', 'completed', 'high'),
  ('集成 DeepSeek AI', '实现智能优先级分析、分类建议等5大AI功能', 'active', 'urgent'),
  ('实现 GitHub 图床', '支持图片自动上传到 GitHub 仓库', 'active', 'medium'),
  ('创建画板功能', '简单涂鸦 + 流程图设计', 'active', 'low'),
  ('数据统计分析', '图表展示和 AI 洞察报告', 'active', 'medium')
) AS todo(title, content, status, priority)
LEFT JOIN category_ids c ON (
  (todo.title LIKE '%架构%' AND c.name = '工作') OR
  (todo.title LIKE '%AI%' AND c.name = '开发') OR
  (todo.title LIKE '%图床%' AND c.name = '开发') OR
  (todo.title LIKE '%画板%' AND c.name = '功能') OR
  (todo.title LIKE '%统计%' AND c.name = '分析')
);
```

## 🔧 环境变量配置

在项目根目录创建 `.env.local` 文件：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# DeepSeek AI (稍后配置)
DEEPSEEK_API_KEY=your-deepseek-api-key

# GitHub 图床 (稍后配置)
GITHUB_TOKEN=your-github-token
GITHUB_OWNER=your-username
GITHUB_REPO=todo-app-uploads
GITHUB_BRANCH=main

# App 配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**重要：**
- 替换 `your-project-id`、`your-anon-public-key` 等为真实值
- 永远不要将 `.env.local` 文件提交到 GitHub
- `service_role` 密钥具有管理员权限，保密！

## ✅ 验证设置

### 1. 检查表创建
在 SQL Editor 中运行：

```sql
SELECT COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public';
```

期望结果：`table_count = 8`

### 2. 检查 RLS 策略
在 SQL Editor 中运行：

```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

期望结果：显示多个策略（每个表 4-5 个策略）

### 3. 检查触发器
在 SQL Editor 中运行：

```sql
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE event_object_schema = 'public';
```

期望结果：显示触发器

## 🚨 故障排除

### 问题 1：权限错误
**错误**：`permission denied for table profiles`
**解决**：确保 RLS 策略已正确创建，并且你已登录

### 问题 2：触发器未运行
**错误**：注册用户后没有自动创建 profile
**解决**：检查触发器是否存在：
```sql
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

### 问题 3：RLS 策略阻止访问
**错误**：数据无法插入或查询
**解决**：检查策略是否正确：
```sql
SELECT policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'todos';
```

## 📚 参考资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Row Level Security 指南](https://supabase.com/docs/guides/auth/auth-row-level-security)
- [PostgreSQL 文档](https://www.postgresql.org/docs/)

## ✅ 下一步

数据库配置完成后，你可以：

1. ✅ 已完成：创建数据库表和策略
2. 🔄 下一步：实现用户认证系统
3. 🔄 接下来：集成 DeepSeek AI
4. 🔄 然后：添加 GitHub 图床
5. 🔄 最后：完善所有功能

---

**需要帮助？**
- 查看 Supabase 文档：https://supabase.com/docs
- 项目 Discord 社区
- 或提交 GitHub Issue

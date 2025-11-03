# ToDo应用 - 三个版本的全功能任务管理系统

## 📋 项目概述

一个基于Next.js构建的全功能ToDo应用，包含三个版本：
1. **公开演示版** (`/demo`) - 预置虚拟数据，展示所有功能
2. **个人使用版** (`/app`) - 完整功能，个人数据管理
3. **对客使用版** (`/guest`) - 独立账户体系

### ✨ 核心功能

- ✅ 随时记录（仅本地存储，支持Markdown）
- 🎨 画板功能（简单涂鸦 + 可选流程图）
- 🏷️ 标签分类系统
- ⚡ 优先级标注（低/中/高/紧急）
- 📅 自动归档和日历提醒
- 🤖 AI助手集成（DeepSeek）
- 📊 数据统计分析
- 📸 GitHub图床（图片自动上传）
- 💾 离线支持

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: Headless UI + Radix UI
- **状态管理**: Zustand
- **图表**: Recharts
- **画布**: HTML5 Canvas
- **Markdown**: react-markdown

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **实时**: Supabase Realtime

### 第三方服务
- **AI**: DeepSeek API
- **图床**: GitHub (raw.githubusercontent.com)
- **部署**: Vercel

## 🗄️ 数据库架构

### 核心表结构

```sql
-- 用户档案表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  user_type TEXT CHECK (user_type IN ('demo', 'personal', 'guest')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 分类/标签表
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 任务表（核心）
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT, -- Markdown内容
  status TEXT CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  category_id UUID REFERENCES categories(id),

  -- 自动归档字段
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,

  -- AI分析结果
  ai_priority_suggestion TEXT,
  ai_category_suggestion UUID,
  ai_summary TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 画板表
CREATE TABLE boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  canvas_data JSONB, -- 存储画板数据
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 附件表 (图片/文件)
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  todo_id UUID REFERENCES todos(id) ON DELETE CASCADE,
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,

  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  github_url TEXT NOT NULL,
  github_path TEXT NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 提醒表
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  todo_id UUID REFERENCES todos(id) ON DELETE CASCADE,

  reminder_date TIMESTAMPTZ NOT NULL,
  reminder_type TEXT CHECK (reminder_type IN ('once', 'daily', 'weekly', 'monthly')) DEFAULT 'once',
  is_sent BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 快速记录表 (仅本地存储的文本)
CREATE TABLE quick_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_synced BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 统计数据表 (用户习惯分析)
CREATE TABLE user_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  date DATE NOT NULL,
  todos_completed INTEGER DEFAULT 0,
  todos_created INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

### 索引优化
```sql
CREATE INDEX idx_todos_user_status ON todos(user_id, status);
CREATE INDEX idx_todos_completed_at ON todos(user_id, completed_at DESC);
CREATE INDEX idx_attachments_user ON attachments(user_id);
CREATE INDEX idx_analytics_user_date ON user_analytics(user_id, date DESC);
```

### RLS (行级安全策略)
```sql
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "Users can view own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);
```

## 🛡️ 权限系统

### 路由结构
```
/                     → 首页（选择版本）
/demo                 → 演示版（无需登录，预置数据）
/login                → 登录页
/register             → 注册页
/app                  → 个人版（需要auth，user_type='personal'）
/app/dashboard
/app/todos
/app/boards
/app/analytics
/guest                → 对客版（需要auth，user_type='guest'）
```

### 认证中间件
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/app')) {
    const user = await getUser(request)
    if (!user || user.user_type !== 'personal') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (pathname.startsWith('/guest')) {
    const user = await getUser(request)
    if (!user || user.user_type !== 'guest') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
```

## 🤖 AI功能 (DeepSeek)

### 配置
```typescript
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-chat'
```

### 核心功能

**1. 智能优先级分析**
- 输入：任务标题 + 内容
- 输出：优先级建议（urgent/high/medium/low）+ 原因

**2. 智能分类建议**
- 输入：任务内容 + 已有分类列表
- 输出：匹配的分类名称

**3. 内容摘要生成**
- 输入：长文本内容
- 输出：100字内摘要

**4. 自然语言搜索**
- 输入："我上周完成的高优先级任务"
- 输出：{ priority: 'high', dateRange: 'lastWeek', status: 'completed' }

**5. 数据洞察报告**
- 输入：用户统计数据
- 输出：个性化使用习惯报告和建议

### 使用场景
- 任务创建时：自动建议优先级和标签
- 任务列表：AI搜索框（支持自然语言）
- 快速记录：长文本自动摘要
- 统计页面：生成个性化洞察报告

## 📸 GitHub图床

### 配置
```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your-username
GITHUB_REPO=todo-app-uploads
GITHUB_BRANCH=main
```

### 文件组织
```
todo-app-uploads/
├── images/
│   ├── todos/
│   │   ├── todo-id-1/
│   │   └── ...
│   ├── boards/
│   │   ├── board-id-1/
│   │   └── ...
│   └── avatars/
│       └── user-id-1.jpg
└── attachments/
    └── file1.pdf
```

### 使用API
```typescript
export async function uploadToGitHub(file: File, path: string) {
  const base64 = await fileToBase64(file)
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Upload ${file.name}`,
        content: base64.replace(/^data:.*;base64,/, ''),
        branch: config.branch
      })
    }
  )
  return response.json()
}
```

### 访问URL
```
https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}
```

### 限制
- 单文件：100MB
- 仓库总量：1GB（soft limit）
- API限制：60次/小时（未认证）/ 5000次/小时（认证）

## 🎨 画板功能

### 基础涂鸦
- 工具：画笔、橡皮擦、直线、矩形、圆形、文字
- 属性：颜色、粗细
- 操作：撤销/重做、缩放、清空

### 流程图功能
**方案1：简易版**
- 可拖拽的流程图节点
- 节点类型：开始、处理、判断、结束
- 自动连接线
- 数据保存为JSON

**方案2：外置集成（可选）**
- Excalidraw：手绘风格
- Draw.io：功能完整
- Miro：团队协作

### 数据结构
```typescript
interface CanvasData {
  nodes: FlowNode[]
  connections: Connection[]
  metadata: {
    version: '1.0'
    createdAt: number
  }
}

interface FlowNode {
  id: string
  type: 'start' | 'process' | 'decision' | 'end'
  text: string
  x: number
  y: number
  width: number
  height: number
}
```

## 💾 离线存储

### 存储策略

**localStorage**
- 快速记录（仅本地）
- 用户设置
- 同步队列

**IndexedDB**
- todos离线缓存
- boards离线缓存

### 同步机制

```
在线状态：实时同步
用户操作 → 更新本地 → 发送到Supabase → 确认更新

离线状态：队列缓存
用户操作 → 更新本地 → 加入同步队列 → 显示离线提示

恢复在线：批量同步
网络恢复 → 读取队列 → 批量上传 → 清空队列 → 提示成功
```

### 代码示例
```typescript
// 同步队列
export const syncQueue = {
  add(action: SyncAction) {
    const queue = JSON.parse(localStorage.getItem('sync_queue') || '[]')
    queue.push({ ...action, timestamp: Date.now() })
    localStorage.setItem('sync_queue', JSON.stringify(queue))
  },

  async process() {
    const queue = JSON.parse(localStorage.getItem('sync_queue') || '[]')
    for (const action of queue) {
      await processAction(action)
    }
    localStorage.removeItem('sync_queue')
  }
}
```

## 🎨 UI/UX设计

### 设计系统
- **主色调**: 蓝色 (#3B82F6)
- **字体**: Inter
- **间距**: 8px基准网格
- **圆角**: 4px/8px/12px
- **动画**: 200ms过渡

### 布局结构

**首页**
- Hero区域介绍三版本
- CTA按钮选择版本

**仪表板 (/app/dashboard)**
- 侧边栏：导航菜单
- 主内容：今日任务、快速统计、最近活动
- 右侧栏：AI建议、提醒

**任务列表 (/app/todos)**
- 顶部：筛选/搜索/新建按钮
- 主体：任务卡片网格
- AI搜索框（支持自然语言）

**画板 (/app/boards)**
- 工具栏
- 画布区域
- 属性面板

**统计 (/app/analytics)**
- 图表展示区
- AI洞察报告

### 响应式
- **Mobile** (< 768px)：底部导航，卡片垂直堆叠
- **Tablet** (768-1024px)：可折叠侧边栏
- **Desktop** (> 1024px)：完整三栏布局

### 核心组件
```
components/
├── ui/              # 基础UI组件
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
│
├── layout/          # 布局组件
│   ├── Sidebar.tsx
│   └── Header.tsx
│
├── features/        # 功能组件
│   ├── TodoCard.tsx
│   ├── TodoEditor.tsx
│   ├── BoardCanvas.tsx
│   └── AIMentor.tsx
│
└── charts/          # 统计图表
    ├── CompletionChart.tsx
    └── PriorityChart.tsx
```

## 📦 项目结构

```
todo-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证路由组
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # 仪表板路由组
│   │   ├── dashboard/
│   │   ├── todos/
│   │   ├── boards/
│   │   └── analytics/
│   ├── demo/              # 演示版
│   ├── guest/             # 对客版
│   ├── api/               # API路由
│   │   ├── auth/
│   │   ├── ai/
│   │   └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/            # React组件
│   ├── ui/
│   ├── layout/
│   ├── features/
│   └── charts/
│
├── lib/                   # 工具库
│   ├── supabase.ts
│   ├── auth.ts
│   ├── ai/
│   │   └── deepseek.ts
│   ├── github.ts
│   ├── storage.ts
│   └── utils.ts
│
├── hooks/                 # 自定义Hooks
│   ├── useAuth.ts
│   ├── useTodos.ts
│   └── useOnlineStatus.ts
│
├── types/                 # TypeScript类型
│   └── index.ts
│
├── public/                # 静态资源
│   └── icons/
│
└── supabase/              # Supabase配置
    ├── migrations/
    └── seed.sql
```

## 🔧 环境变量

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# DeepSeek AI
DEEPSEEK_API_KEY=your_deepseek_key

# GitHub (图床)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your_username
GITHUB_REPO=todo-app-uploads
GITHUB_BRANCH=main

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 部署计划

### 开发阶段
1. **基础设施** (3-5天)
   - 初始化项目
   - 配置Supabase
   - 基础组件库

2. **用户系统** (2-3天)
   - 登录/注册
   - 权限控制
   - 演示数据

3. **核心功能** (5-7天)
   - 任务CRUD
   - 分类系统
   - 优先级
   - 归档

4. **画板功能** (3-4天)
   - 涂鸦画板
   - 保存/加载
   - 缩略图

5. **AI集成** (4-5天)
   - DeepSeek接入
   - 5大AI功能

6. **扩展功能** (3-4天)
   - GitHub图床
   - 文件上传
   - 日历提醒
   - 统计分析

7. **优化** (2-3天)
   - 响应式
   - 离线支持
   - 性能优化

**总预计**: 22-34天

### 部署步骤

1. **GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo>
   git push -u origin main
   ```

2. **Supabase**
   - 创建项目
   - 执行migrations
   - 配置RLS策略
   - 设置Auth回调URL

3. **Vercel**
   - 连接GitHub仓库
   - 配置环境变量
   - 自动部署
   - 绑定域名（可选）

4. **GitHub Token**
   - 创建Personal Access Token
   - 权限：repo（完整仓库权限）
   - 创建uploads仓库

5. **DeepSeek**
   - 注册账号
   - 获取API Key
   - 监控使用量

## 🔑 关键设计决策

### 1. 数据永不丢失
- 所有记录软删除（status字段标记）
- `completed_at` 记录完成时间
- `archived_at` 记录归档时间
- RLS策略保障数据安全

### 2. 三版本隔离
- 同一代码库，通过路由和权限区分
- `/demo` 预置数据
- `/app` 个人版（user_type='personal'）
- `/guest` 对客版（user_type='guest'）

### 3. AI功能优先级
- 任务创建时：智能优先级和分类建议
- 搜索时：自然语言解析
- 长文本时：自动摘要
- 统计时：个性化洞察报告

### 4. 离线优先
- 快速记录仅本地
- 操作先本地后同步
- 网络恢复时批量同步
- 同步队列保证数据一致性

### 5. 图床策略
- GitHub免费且稳定
- 通过raw.githubusercontent.com直接访问
- 文件组织按类型和ID分类
- 预留压缩和CDN优化空间

## 📚 开发规范

### 代码规范
- ESLint + Prettier
- TypeScript strict模式
- 组件文件名：PascalCase
- 工具函数文件名：camelCase

### Git提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式化
refactor: 重构
test: 测试
chore: 构建过程或辅助工具的变动
```

### 组件规范
- 函数式组件 + Hooks
- Props接口明确
- 默认值合理
- 错误边界处理
- 加载状态友好

## 🧪 测试策略

### 单元测试
- Jest + React Testing Library
- 工具函数测试
- 组件渲染测试

### E2E测试
- Playwright
- 关键流程：登录、创建任务、完成归档

### 性能测试
- Lighthouse评分 > 90
- 首屏加载 < 2s
- 图片懒加载
- 代码分割

## 🔍 监控和日志

### 错误监控
- Sentry集成（可选）
- 错误边界捕获
- 用户反馈收集

### 性能监控
- Vercel Analytics
- Core Web Vitals
- API响应时间

### 使用分析
- 用户行为统计
- 功能使用频率
- AI调用量监控

## 📝 更新日志

### v1.0.0 (规划中)
- ✨ 初始版本发布
- ✅ 基础ToDo功能
- ✅ 三版本系统
- ✅ DeepSeek AI集成
- ✅ GitHub图床
- ✅ 画板功能
- ✅ 统计分析
- ✅ 离线支持

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发流程
1. Fork项目
2. 创建特性分支
3. 提交代码
4. 创建Pull Request

## 📄 许可证

MIT License

## 👨‍💻 作者

- 开发者：个人项目
- 技术栈：Next.js + Supabase + DeepSeek
- 部署：Vercel

---

## 📌 快速开始

### 前提条件
- Node.js 18+
- npm 9+
- Supabase账号
- DeepSeek账号
- GitHub账号（用于图床）

### 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd todo-app

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入所有必要的API Key

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

### 数据库初始化

```bash
# 安装Supabase CLI
npm install -g supabase

# 启动Supabase（本地开发）
supabase start

# 或者连接到远程Supabase
# 在Supabase Dashboard中执行 supabase/migrations/ 下的SQL文件
```

---

## ❓ 常见问题

**Q: 为什么选择GitHub作为图床？**
A: 免费、稳定、CDN加速，适合个人项目使用。

**Q: DeepSeek API有使用限制吗？**
A: 有免费额度，建议监控使用量，超出后需要付费。

**Q: 数据安全如何保障？**
A: Supabase RLS策略确保用户只能访问自己的数据。

**Q: 离线数据会丢失吗？**
A: 不会，离线操作会加入同步队列，网络恢复后自动上传。

**Q: 支持多设备同步吗？**
A: 支持，Supabase云端存储，多设备实时同步。

---

## 🎯 路线图

### 短期目标
- [x] 项目初始化
- [ ] 基础功能开发
- [ ] AI集成测试

### 长期目标
- [ ] 移动端App
- [ ] 团队协作功能
- [ ] 更多AI功能
- [ ] 插件系统

---

**最后更新**: 2025-11-01

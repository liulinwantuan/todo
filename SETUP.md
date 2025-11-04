# ToDo 应用 - 完整设置指南

## 项目概述

这是一个基于 Next.js + Supabase + DeepSeek AI 构建的全功能 ToDo 应用，支持：
- 用户认证与授权
- 任务管理（增删改查）
- 画板功能（开发中）
- 数据统计分析（开发中）
- AI 智能助手（开发中）
- GitHub 图床集成（开发中）

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或者
yarn install
```

### 2. 配置环境变量

复制 `.env.local` 文件并填入你的配置：

```bash
cp .env.local .env.local
```

填入以下变量：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_项目_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_匿名密钥
SUPABASE_SERVICE_ROLE_KEY=你的_supabase_服务角色密钥（可选）

# DeepSeek AI 配置（可选）
DEEPSEEK_API_KEY=你的_deepseek_api_key

# GitHub 图床配置（可选）
GITHUB_TOKEN=你的_github_personal_access_token
GITHUB_OWNER=你的_github_用户名
GITHUB_REPO=你的_仓库名称
GITHUB_BRANCH=main

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3008
```

### 3. 设置 Supabase 数据库

#### 3.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并创建账户
2. 点击 "New Project" 创建新项目
3. 等待项目初始化完成

#### 3.2 执行 SQL 脚本

在 Supabase Dashboard 中：

1. 打开 SQL Editor
2. 复制 `src/lib/supabase-schema.sql` 文件中的所有内容
3. 粘贴到 SQL Editor 并执行

这将创建：
- `todos` 表：存储任务数据
- `boards` 表：存储画板数据
- Row Level Security (RLS) 策略：确保用户只能访问自己的数据
- 自动更新触发器：自动维护 `updated_at` 字段

#### 3.3 获取密钥

在 Supabase Dashboard 的 Settings → API 中：

1. 复制 `URL` 到 `NEXT_PUBLIC_SUPABASE_URL`
2. 复制 `anon public` 密钥到 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 复制 `service_role secret` 密钥到 `SUPABASE_SERVICE_ROLE_KEY`（可选）

#### 3.4 配置认证

在 Supabase Dashboard 的 Authentication → Settings 中：

1. 找到 "Site URL" 设置
2. 添加你的应用 URL（例如：`http://localhost:3008` 或你的生产域名）
3. 在 "Redirect URLs" 中添加允许的重定向地址

#### 3.5 启用邮箱认证（可选）

在 Authentication → Settings → Auth Providers 中：

1. 启用 "Email" provider
2. 配置邮箱模板（可选）

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3008](http://localhost:3008)

## 功能说明

### 用户认证

- **注册**：用户可以通过邮箱和密码注册
- **登录**：已注册用户可以登录
- **自动会话**：使用 Supabase 的持久化会话管理

### 任务管理

- **创建任务**：支持标题、描述、分类、优先级、截止日期
- **查看任务**：按状态（全部/进行中/已完成）筛选
- **编辑任务**：点击编辑按钮修改任务信息
- **切换状态**：点击复选框标记完成/未完成
- **删除任务**：点击删除按钮移除任务
- **搜索**：支持按标题搜索

### 优先级系统

- **紧急**：红色背景，用于最重要的任务
- **高**：橙色背景，用于重要任务
- **中**：蓝色背景（默认），用于一般任务
- **低**：灰色背景，用于低优先级任务

### 分类系统

支持以下分类：
- 工作
- 开发
- 个人
- 功能
- 分析
- 其他

## 技术架构

### 前端

- **Next.js 14**：React 框架
- **TypeScript**：类型安全
- **Tailwind CSS**：样式框架（本项目使用内联样式）

### 后端

- **Supabase**：后端即服务
  - PostgreSQL 数据库
  - 用户认证
  - Row Level Security (RLS)
  - 实时订阅（开发中）

### 开发中功能

- **画板功能**：使用 HTML5 Canvas 实现涂鸦和流程图
- **DeepSeek AI**：智能任务分析和建议
- **GitHub 图床**：图片自动上传到 GitHub
- **数据分析**：使用 Recharts 实现可视化图表

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── app/               # 认证后的应用页面
│   │   ├── dashboard/     # 仪表板
│   │   ├── todos/         # 任务管理
│   │   ├── boards/        # 画板
│   │   └── analytics/     # 数据统计
│   ├── login/             # 登录页
│   ├── register/          # 注册页
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── todo-modal.tsx     # 任务模态框
│   └── auth-provider.tsx  # 认证提供者
├── contexts/              # React Context
│   └── auth-context.tsx   # 认证上下文
├── hooks/                 # 自定义 Hooks
│   └── use-todos.ts       # 任务操作 Hook
├── lib/                   # 工具库
│   ├── supabase.ts        # Supabase 客户端
│   └── supabase-schema.sql # 数据库脚本
└── types/                 # TypeScript 类型定义
    ├── database.ts        # 数据库类型
    └── todo.ts            # 任务类型
```

## 数据库设计

### todos 表

```sql
id          uuid        primary key
user_id     uuid        references auth.users(id)
title       text        not null
description text
category    text        not null default '其他'
priority    priority    not null default 'medium'
status      status      not null default 'active'
created_at  timestamptz default now()
updated_at  timestamptz default now()
due_date    timestamptz
```

### boards 表

```sql
id          uuid        primary key
user_id     uuid        references auth.users(id)
title       text        not null
data        jsonb
created_at  timestamptz default now()
updated_at  timestamptz default now()
```

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入你的 GitHub 仓库
4. 配置环境变量（在 Vercel Dashboard 的 Settings → Environment Variables）
5. 部署

### 环境变量设置

确保在生产环境中设置以下环境变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- 其他可选变量

### 更新 Supabase 配置

在 Supabase Dashboard 中更新 Site URL 和 Redirect URLs 为你的生产域名。

## 故障排除

### 数据库连接失败

1. 检查环境变量是否正确设置
2. 确认 Supabase 项目状态正常
3. 检查网络连接

### 认证问题

1. 确认 Site URL 和 Redirect URLs 配置正确
2. 检查邮箱认证是否启用
3. 查看 Supabase Dashboard 的日志

### 权限错误

1. 确认 RLS 策略已正确创建
2. 检查用户是否已登录
3. 验证 SQL 脚本是否成功执行

## 开发指南

### 添加新功能

1. 创建数据库表（如需要）
2. 定义 TypeScript 类型
3. 创建数据库操作 Hook
4. 实现 UI 组件
5. 添加路由页面

### 代码规范

- 使用 TypeScript 确保类型安全
- 使用自定义 Hook 封装业务逻辑
- 使用内联样式（项目约定）
- 遵循 ESLint 和 Prettier 配置

## 许可证

MIT License

## 支持

如有问题，请提交 Issue 或联系开发者。

---

感谢使用 ToDo 应用！🎉

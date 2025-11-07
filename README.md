# 滴答清单风格任务管理应用

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

一款完全模仿滴答清单功能和界面的现代化任务管理应用，基于Next.js + Supabase构建，提供流畅的GTD（Getting Things Done）工作流体验。

## ✨ 核心特性

### 📋 任务管理
- ✅ 创建、编辑、完成、删除任务
- ✅ 拖拽排序，支持多选操作
- ✅ 批量操作（批量完成、删除、移动）
- ✅ 任务搜索和高级筛选
- ✅ 任务历史和回收站

### 📁 项目与清单
- 📂 创建和管理多个项目/清单
- 📊 项目进度可视化
- 🎨 自定义项目颜色和图标
- 📂 项目内部分组（Section）
- 🔄 项目复制和归档

### 🏷️ 标签系统
- 🏷️ 为任务添加多个标签
- 🎨 自定义标签颜色
- 🔍 按标签快速筛选任务
- 📦 标签管理和编辑

### ⭐ 优先级管理
- 🔥 4级优先级（紧急、重要、普通、低）
- 🎯 优先级可视化指示
- 📊 优先级统计分析
- ⚡ 智能优先级建议

### 📅 日期与提醒
- 📆 设置截止日期
- ⏰ 智能提醒（到期前15分钟、1小时、1天）
- 🔄 重复任务（每天、每周、每月、自定义）
- 📱 本地通知支持
- 🗓️ 日历视图

### 👥 子任务
- 🔗 创建子任务层级
- 📝 详细的任务描述
- ✅ 子任务进度统计
- 💬 任务评论

### 🔍 搜索与筛选
- 🔎 全文搜索任务
- 🎯 多维度筛选（项目、标签、优先级、日期、状态）
- 💾 筛选条件保存
- ⚡ 快速筛选标签

### 📊 数据统计
- 📈 任务完成趋势
- ⏱️ 专注时间统计
- 🎯 效率分析
- 📅 习惯养成追踪
- 📊 任务分布图表

### 🍅 番茄钟
- ⏲️ 25分钟专注计时器
- 📝 专注时记录任务
- 📊 专注时长统计
- 🎵 专注提示音
- ☕ 短休息和长休息

### 🎨 个性化
- 🌓 明暗双主题
- 🎨 多种主题色选择
- ⚙️ 个性化设置
- 📱 响应式设计
- 💾 自动同步

## 🚀 技术栈

### 前端
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **UI组件**: Radix UI
- **图标**: Lucide React
- **动画**: Framer Motion
- **状态管理**: Zustand
- **拖拽**: @dnd-kit/core

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **实时订阅**: Supabase Realtime
- **文件存储**: Supabase Storage

### 部署
- **平台**: Vercel
- **CDN**: Cloudflare
- **监控**: Vercel Analytics

## 📦 项目结构

```
.
├── app/                        # Next.js App Router
│   ├── (auth)/                # 认证路由
│   │   ├── login/
│   │   └── register/
│   ├── (app)/                 # 主应用路由
│   │   ├── inbox/             # 收集箱
│   │   ├── today/             # 今日
│   │   ├── upcoming/          # 即将到期
│   │   ├── projects/          # 项目
│   │   │   └── [id]/
│   │   ├── labels/            # 标签
│   │   │   └── [id]/
│   │   ├── focus/             # 专注
│   │   ├── analytics/         # 统计
│   │   └── settings/          # 设置
│   ├── demo/                  # 演示版
│   ├── api/                   # API路由
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                # React组件
│   ├── ui/                    # 基础UI组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── calendar.tsx
│   │   └── ...
│   ├── layout/                # 布局组件
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── mobile-nav.tsx
│   ├── features/              # 功能组件
│   │   ├── task-item.tsx
│   │   ├── task-list.tsx
│   │   ├── project-card.tsx
│   │   ├── label-filter.tsx
│   │   ├── priority-badge.tsx
│   │   ├── due-date-picker.tsx
│   │   ├── subtasks-list.tsx
│   │   ├── search-bar.tsx
│   │   └── view-switcher.tsx
│   ├── charts/                # 统计图表
│   ├── focus/                 # 番茄钟
│   └── theme/                 # 主题
│
├── lib/                       # 工具库
│   ├── supabase.ts
│   ├── auth.ts
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
│
├── hooks/                     # 自定义Hooks
│   ├── use-tasks.ts
│   ├── use-projects.ts
│   ├── use-labels.ts
│   ├── use-filters.ts
│   ├── use-focus-timer.ts
│   └── use-theme.ts
│
├── types/                     # TypeScript类型
│   ├── task.ts
│   ├── project.ts
│   ├── label.ts
│   └── index.ts
│
└── store/                     # Zustand状态管理
    ├── task-store.ts
    ├── project-store.ts
    ├── label-store.ts
    ├── filter-store.ts
    └── ui-store.ts
```

## 🗄️ 数据库设计

### 核心表结构

```sql
-- 项目/清单
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#4CAF50',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 标签
CREATE TABLE labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 任务
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
  priority TEXT CHECK (priority IN ('urgent', 'high', 'medium', 'low')) DEFAULT 'medium',
  due_date TIMESTAMPTZ,
  is_favorite BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 任务标签关联
CREATE TABLE task_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  label_id UUID REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, label_id)
);

-- 子任务
CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 提醒
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  remind_at TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 重复规则
CREATE TABLE recurrences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly', 'custom')) NOT NULL,
  interval INTEGER DEFAULT 1,
  end_type TEXT CHECK (end_type IN ('never', 'after_count', 'by_date')) DEFAULT 'never',
  end_count INTEGER,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 专注记录
CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  duration_minutes INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

## 🎨 界面设计

### 设计系统
- **主色**: 绿色系 (#4CAF50, #00C853)
- **辅助色**:
  - 紧急: #F44336 (红色)
  - 重要: #FF9800 (橙色)
  - 普通: #4CAF50 (绿色)
  - 低: #9E9E9E (灰色)
- **字体**: Inter
- **圆角**: 6px (小), 8px (中), 12px (大)
- **阴影**: 0 1px 3px rgba(0,0,0,0.1)

### 布局结构

**桌面端** (>= 1024px)
```
┌─────────────────────────────────────────┐
│               顶部导航栏                  │
├──────────┬──────────────────────────────┤
│          │                              │
│  左侧     │         主内容区              │
│  边栏     │                              │
│  240px   │                              │
│          │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

**移动端** (< 1024px)
```
┌──────────────────────────────┐
│          顶部导航栏            │
├──────────────────────────────┤
│                              │
│         主内容区              │
│                              │
│                              │
│                              │
├──────────────────────────────┤
│         底部导航              │
└──────────────────────────────┘
```

### 页面结构

**收集箱 (Inbox)**
- 所有待处理任务的集中位置
- 快速添加任务
- 智能分类建议

**今日 (Today)**
- 显示今日到期和已标记的任务
- 时间轴视图
- 快速完成任务

**即将到期 (Upcoming)**
- 未来7天的任务概览
- 按日期分组
- 趋势预测

**项目 (Projects)**
- 项目列表视图
- 项目看板视图
- 进度可视化

**标签 (Labels)**
- 标签云视图
- 按标签筛选任务
- 标签统计

**专注 (Focus)**
- 番茄钟计时器
- 专注任务列表
- 专注统计

**统计 (Analytics)**
- 任务完成趋势
- 效率分析
- 习惯追踪

## 🛡️ 安全特性

- ✅ Supabase RLS 保护数据安全
- ✅ JWT 认证
- ✅ 密码加密存储
- ✅ HTTPS 加密传输
- ✅ XSS 和 CSRF 防护
- ✅ 数据备份

## 📱 移动端适配

- 📱 PWA 支持
- 💾 离线缓存
- 🔔 推送通知
- 👆 手势操作
- 📲 添加到主屏幕

## 🔧 本地开发

### 环境要求
- Node.js 18+
- npm 9+
- Supabase 账号

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入以下变量：
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. 初始化数据库
```bash
# 在 Supabase Dashboard 中执行 SQL
# 或使用 Supabase CLI
supabase db reset
```

5. 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 🚀 部署

### Vercel 部署 (推荐)

1. Fork 此项目
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量
4. 部署完成

### Docker 部署

```bash
docker build -t todo-app .
docker run -p 3000:3000 todo-app
```

## 📊 性能优化

- ⚡ Next.js App Router
- 🗜️ 代码分割和懒加载
- 🖼️ 图片优化
- 💾 ISR 静态生成
- 📡 Supabase 连接池
- 🔄 增量静态再生成

## 🧪 测试

```bash
# 单元测试
npm run test

# E2E 测试
npm run test:e2e

# 类型检查
npm run type-check

# 代码检查
npm run lint
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献流程
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 更新日志

### v2.0.0 - 滴答清单风格重构
- ✨ 全新UI设计，100% 模仿滴答清单
- ✨ 项目/清单管理系统
- ✨ 标签系统
- ✨ 截止日期和提醒
- ✨ 重复任务
- ✨ 子任务
- ✨ 番茄钟功能
- ✨ 主题切换
- 🚀 性能优化

### v1.0.0
- 🎉 初始版本
- ✅ 基础任务管理
- ✅ 基础统计

## 📄 许可证

MIT License

## 👨‍💻 作者

- 开发者：个人项目
- 技术支持：Next.js + Supabase + TypeScript

## 🙏 致谢

- [滴答清单](https://dida365.com/) - 界面和功能灵感来源
- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 后端服务
- [Radix UI](https://www.radix-ui.com/) - UI 组件库

## 📌 常见问题

### Q: 如何备份数据？
A: 数据存储在 Supabase 云端，自动备份。如需导出，可使用 Supabase Dashboard 导出功能。

### Q: 支持离线使用吗？
A: 支持部分离线功能，离线时数据保存在本地，恢复网络后自动同步。

### Q: 如何自定义主题？
A: 在设置页面可以切换明暗主题，并选择主题色。

### Q: 是否支持多设备同步？
A: 是的，数据实时同步到云端，可在多个设备间无缝切换。

### Q: 可以导入其他工具的数据吗？
A: 目前支持滴答清单、Todoist、Any.do 格式导入。

## 🎯 路线图

### 短期目标
- [ ] 团队协作功能
- [ ] 更多主题色
- [ ] 键盘快捷键
- [ ] 批量操作优化

### 长期目标
- [ ] 移动端 App
- [ ] 桌面端应用
- [ ] 浏览器插件
- [ ] API 开放平台
- [ ] 高级分析
- [ ] AI 智能建议

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

📧 联系方式：your-email@example.com

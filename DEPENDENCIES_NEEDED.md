# 需要添加的依赖包

## 安装命令
```bash
npm install clsx tailwind-merge @tanstack/react-query
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @types/jest jest
npm install -D playwright @playwright/test
```

## 依赖说明

### 运行时依赖
- **clsx**: 条件类名合并
- **tailwind-merge**: Tailwind CSS 类名合并优化
- **@tanstack/react-query**: 数据获取和缓存（替代自定义 hooks）

### 开发依赖
- **@testing-library/react**: React 组件测试
- **@testing-library/jest-dom**: Jest 匹配器
- **@testing-library/user-event**: 用户交互测试
- **jest**: 单元测试框架
- **jest-environment-jsdom**: Jest DOM 环境
- **@types/jest**: Jest 类型定义
- **playwright**: E2E 测试框架
- **@playwright/test**: Playwright 测试工具

## 配置更新

### 1. 根目录添加 jest.config.js
```javascript
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
}
```

### 2. 根目录添加 jest.setup.js
```javascript
import '@testing-library/jest-dom'
```

### 3. 项目根目录添加 playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## 使用示例

### 1. 使用 React Query Hook
```typescript
import { useTodos } from '@/hooks/use-todos-optimized'

function TodoList() {
  const { todos, isLoading, createTodo, updateTodo } = useTodos()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
```

### 2. 使用 UI 组件
```typescript
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

function CreateTodoForm() {
  return (
    <Card>
      <Input label="Title" required />
      <Button variant="primary">Create</Button>
    </Card>
  )
}
```

### 3. 使用工具函数
```typescript
import { cn } from '@/utils/cn'
import { PRIORITY_LABELS } from '@/lib/constants'

// 合并类名
<div className={cn('base-class', condition && 'conditional-class')} />

// 使用常量
<span>{PRIORITY_LABELS.urgent}</span>
```

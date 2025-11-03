/**
 * DeepSeek AI 集成
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface DeepSeekResponse {
  success: boolean
  content?: string
  error?: string
}

/**
 * 调用 DeepSeek API
 * @param messages - 消息数组
 * @returns AI 响应
 */
export async function chatWithDeepSeek(messages: DeepSeekMessage[]): Promise<DeepSeekResponse> {
  if (!DEEPSEEK_API_KEY) {
    return {
      success: false,
      error: 'DeepSeek API Key 未配置',
    }
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        content: data.choices[0]?.message?.content || '无响应',
      }
    } else {
      return {
        success: false,
        error: data.error?.message || 'API 调用失败',
      }
    }
  } catch (error) {
    console.error('DeepSeek API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '网络错误',
    }
  }
}

/**
 * 智能分析任务优先级
 * @param title - 任务标题
 * @param content - 任务内容
 * @returns 优先级建议
 */
export async function analyzeTaskPriority(
  title: string,
  content?: string
): Promise<{ success: boolean; priority?: string; reason?: string; error?: string }> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个任务管理专家。根据任务标题和内容，分析任务的优先级。返回以下格式：priority: [urgent/high/medium/low], reason: [原因]',
    },
    {
      role: 'user',
      content: `任务标题：${title}\n任务内容：${content || '无'}\n\n请分析优先级并返回标准格式。`,
    },
  ]

  const response = await chatWithDeepSeek(messages)

  if (!response.success || !response.content) {
    return { success: false, error: response.error || '分析失败' }
  }

  const content = response.content
  const priorityMatch = content.match(/priority:\s*(\w+)/i)
  const reasonMatch = content.match(/reason:\s*([\s\S]+)/i)

  return {
    success: true,
    priority: priorityMatch?.[1]?.toLowerCase(),
    reason: reasonMatch?.[1]?.trim(),
  }
}

/**
 * 建议任务分类
 * @param title - 任务标题
 * @param content - 任务内容
 * @returns 分类建议
 */
export async function suggestTaskCategory(
  title: string,
  content?: string
): Promise<{ success: boolean; category?: string; reason?: string; error?: string }> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个任务管理专家。根据任务内容，建议合适的分类。返回格式：category: [分类名], reason: [原因]',
    },
    {
      role: 'user',
      content: `任务标题：${title}\n任务内容：${content || '无'}\n\n建议一个分类并返回标准格式。`,
    },
  ]

  const response = await chatWithDeepSeek(messages)

  if (!response.success || !response.content) {
    return { success: false, error: response.error || '分析失败' }
  }

  const content = response.content
  const categoryMatch = content.match(/category:\s*([\w\s]+)/i)
  const reasonMatch = content.match(/reason:\s*([\s\S]+)/i)

  return {
    success: true,
    category: categoryMatch?.[1]?.trim(),
    reason: reasonMatch?.[1]?.trim(),
  }
}

/**
 * 生成任务描述
 * @param title - 任务标题
 * @param keywords - 关键词
 * @returns 任务描述
 */
export async function generateTaskDescription(
  title: string,
  keywords?: string
): Promise<{ success: boolean; description?: string; error?: string }> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个任务管理专家。根据任务标题和关键词，生成详细的任务描述。',
    },
    {
      role: 'user',
      content: `任务标题：${title}\n关键词：${keywords || '无'}\n\n请生成一个详细的任务描述（50-100字）。`,
    },
  ]

  const response = await chatWithDeepSeek(messages)

  if (!response.success || !response.content) {
    return { success: false, error: response.error || '生成失败' }
  }

  return {
    success: true,
    description: response.content.trim(),
  }
}

/**
 * 智能拆分任务
 * @param title - 任务标题
 * @param content - 任务内容
 * @returns 子任务列表
 */
export async function splitTask(
  title: string,
  content?: string
): Promise<{ success: boolean; subtasks?: string[]; error?: string }> {
  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个任务管理专家。将复杂任务拆分为3-5个可执行的子任务。返回格式：1. 子任务1\n2. 子任务2\n...',
    },
    {
      role: 'user',
      content: `任务标题：${title}\n任务内容：${content || '无'}\n\n请拆分为可执行的子任务。`,
    },
  ]

  const response = await chatWithDeepSeek(messages)

  if (!response.success || !response.content) {
    return { success: false, error: response.error || '拆分失败' }
  }

  const subtasks = response.content
    .split('\n')
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(line => line.length > 0)

  return {
    success: true,
    subtasks,
  }
}

/**
 * 生成洞察报告
 * @param todos - 任务列表
 * @returns 洞察报告
 */
export async function generateInsights(
  todos: Array<{ title: string; content?: string; priority?: string; status?: string }>
): Promise<{ success: boolean; insights?: string; error?: string }> {
  const todoSummary = todos
    .map((todo, index) => `${index + 1}. ${todo.title} (${todo.priority || '未知优先级'})`)
    .join('\n')

  const messages: DeepSeekMessage[] = [
    {
      role: 'system',
      content: '你是一个数据分析专家。根据任务列表，生成简短的洞察报告。',
    },
    {
      role: 'user',
      content: `任务列表：\n${todoSummary}\n\n请生成3-5条洞察报告，包括优先级分布、工作效率建议等。`,
    },
  ]

  const response = await chatWithDeepSeek(messages)

  if (!response.success || !response.content) {
    return { success: false, error: response.error || '生成失败' }
  }

  return {
    success: true,
    insights: response.content.trim(),
  }
}

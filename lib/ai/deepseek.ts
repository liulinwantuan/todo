import type { DeepSeekMessage, DeepSeekResponse, AIPrioritySuggestion, AICategorySuggestion } from '@/types'

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_MODEL = 'deepseek-chat'

// 通用调用DeepSeek API的函数
async function callDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`)
  }

  const data: DeepSeekResponse = await response.json()
  return data.choices[0]?.message?.content || ''
}

// 智能优先级建议
export async function suggestPriority(
  title: string,
  content: string
): Promise<AIPrioritySuggestion> {
  const prompt = `作为一个任务管理专家，请分析以下任务并建议优先级。

任务标题：${title}
任务详情：${content || '无'}

请根据任务的重要性和紧急性判断优先级：
- urgent: 紧急且重要，立即处理
- high: 高优先级，优先处理
- medium: 中等优先级，正常处理
- low: 低优先级，可延后处理

请以JSON格式返回：{"priority": "urgent/high/medium/low", "reason": "原因说明"}`

  try {
    const result = await callDeepSeek([{ role: 'user', content: prompt }])
    const jsonMatch = result.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (error) {
    console.error('Error suggesting priority:', error)
  }

  // 默认返回中等优先级
  return {
    priority: 'medium',
    reason: 'AI分析失败，使用默认优先级',
  }
}

// 智能分类建议
export async function suggestCategory(
  title: string,
  content: string,
  existingCategories: string[]
): Promise<AICategorySuggestion | null> {
  if (existingCategories.length === 0) return null

  const categoryList = existingCategories.join('、')
  const prompt = `作为一个任务分类专家，请分析以下任务并从现有分类中选择最匹配的。

任务标题：${title}
任务详情：${content || '无'}

现有分类：${categoryList}

请选择最匹配的分类，如果都不匹配请返回null。

请以JSON格式返回：{"category_id": "分类名称", "confidence": 0.95}`

  try {
    const result = await callDeepSeek([{ role: 'user', content: prompt }])
    const jsonMatch = result.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      const matchedCategory = existingCategories.find((cat) => cat === parsed.category_id)
      if (matchedCategory) {
        return {
          category_id: matchedCategory,
          category_name: matchedCategory,
          confidence: parsed.confidence || 0.8,
        }
      }
    }
  } catch (error) {
    console.error('Error suggesting category:', error)
  }

  return null
}

// 内容摘要生成
export async function summarizeContent(content: string): Promise<string> {
  const prompt = `请对以下文本生成简洁的摘要，保留关键信息：

${content}

要求：
- 摘要不超过100字
- 突出核心要点
- 语言简洁明了

请直接返回摘要内容，不要添加其他说明。`

  try {
    const summary = await callDeepSeek([{ role: 'user', content: prompt }])
    return summary.trim()
  } catch (error) {
    console.error('Error summarizing content:', error)
    return content.length > 100 ? content.slice(0, 100) + '...' : content
  }
}

// 自然语言搜索解析
export async function parseSearchQuery(query: string): Promise<any> {
  const prompt = `请解析以下自然语言查询并转换为搜索过滤器：

查询：${query}

请分析查询中包含的条件：
- 优先级：urgent/high/medium/low
- 状态：active/completed/archived
- 时间范围：today/yesterday/lastWeek/lastMonth/custom
- 关键词

请以JSON格式返回：{
  "priority": "urgent/high/medium/low/null",
  "status": "active/completed/archived/null",
  "dateRange": "today/yesterday/lastWeek/lastMonth/custom/null",
  "startDate": "YYYY-MM-DD or null",
  "endDate": "YYYY-MM-DD or null",
  "searchQuery": "提取的关键词或null"
}

如果没有匹配到某项，请设为null。`

  try {
    const result = await callDeepSeek([{ role: 'user', content: prompt }])
    const jsonMatch = result.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (error) {
    console.error('Error parsing search query:', error)
  }

  return {
    priority: null,
    status: null,
    dateRange: null,
    startDate: null,
    endDate: null,
    searchQuery: query,
  }
}

// 生成数据洞察报告
export async function generateInsightReport(
  stats: {
    todosCompleted: number
    todosCreated: number
    timeSpent: number
    categoryBreakdown: Record<string, number>
    priorityBreakdown: Record<string, number>
  }
): Promise<string> {
  const prompt = `请基于以下用户数据生成个性化的任务管理洞察报告：

已完成任务：${stats.todosCompleted}个
新建任务：${stats.todosCreated}个
使用时长：${stats.timeSpent}分钟

分类分布：
${Object.entries(stats.categoryBreakdown)
  .map(([cat, count]) => `${cat}: ${count}个`)
  .join('\n')}

优先级分布：
${Object.entries(stats.priorityBreakdown)
  .map(([priority, count]) => `${priority}: ${count}个`)
  .join('\n')}

请提供：
1. 任务完成效率分析
2. 习惯特点总结
3. 改进建议
4. 下周推荐行动

请用友好的语调撰写，字数200字左右。`

  try {
    const report = await callDeepSeek([{ role: 'user', content: prompt }])
    return report
  } catch (error) {
    console.error('Error generating insight report:', error)
    return '无法生成洞察报告，请稍后重试。'
  }
}

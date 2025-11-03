import type { GitHubUploadConfig, GitHubUploadResponse } from '@/types'

// GitHub配置
function getGitHubConfig(): GitHubUploadConfig {
  return {
    token: process.env.GITHUB_TOKEN!,
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    branch: process.env.GITHUB_BRANCH || 'main',
  }
}

// 文件转换为base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 上传文件到GitHub
export async function uploadToGitHub(
  file: File,
  path: string
): Promise<{ url: string; path: string }> {
  const config = getGitHubConfig()

  // 转换为base64
  const base64 = await fileToBase64(file)

  // 上传到GitHub
  const response = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Upload ${file.name}`,
        content: base64.replace(/^data:.*;base64,/, ''),
        branch: config.branch,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`GitHub upload failed: ${error}`)
  }

  const data: GitHubUploadResponse = await response.json()

  // 返回可访问的URL
  return {
    url: `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${path}`,
    path: data.content.path,
  }
}

// 生成文件路径
export function generateFilePath(
  type: 'todos' | 'boards' | 'avatars' | 'attachments',
  id: string,
  filename: string
): string {
  const timestamp = Date.now()
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `images/${type}/${id}/${timestamp}-${sanitizedFilename}`
}

// 上传图片
export async function uploadImage(
  file: File,
  type: 'todos' | 'boards' | 'avatars' | 'attachments',
  id: string
): Promise<{ url: string; path: string }> {
  const path = generateFilePath(type, id, file.name)
  return await uploadToGitHub(file, path)
}

// 上传附件
export async function uploadAttachment(
  file: File,
  id: string
): Promise<{ url: string; path: string }> {
  const path = `attachments/${id}/${Date.now()}-${file.name}`
  return await uploadToGitHub(file, path)
}

// 删除文件
export async function deleteFromGitHub(path: string): Promise<void> {
  const config = getGitHubConfig()

  // 先获取文件SHA
  const getResponse = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`,
    {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  )

  if (!getResponse.ok) {
    throw new Error('Failed to get file info')
  }

  const fileInfo = await getResponse.json()

  // 删除文件
  const deleteResponse = await fetch(
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Delete ${path}`,
        sha: fileInfo.sha,
        branch: config.branch,
      }),
    }
  )

  if (!deleteResponse.ok) {
    throw new Error('Failed to delete file')
  }
}

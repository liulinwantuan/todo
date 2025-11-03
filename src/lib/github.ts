/**
 * GitHub 图床功能
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = process.env.GITHUB_OWNER
const GITHUB_REPO = process.env.GITHUB_REPO || 'todo-app-uploads'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'

interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}

/**
 * 上传文件到 GitHub
 * @param file - 文件对象
 * @param path - 文件路径（可选）
 * @returns 上传结果
 */
export async function uploadToGitHub(file: File, path?: string): Promise<UploadResponse> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER) {
    return {
      success: false,
      error: 'GitHub 配置不完整',
    }
  }

  try {
    // 生成文件名
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split('.').pop()
    const filename = path || `${timestamp}-${random}.${ext}`

    // 读取文件内容
    const content = await fileToBase64(file)

    // GitHub API URL
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filename}`

    // 发送请求
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Upload: ${file.name}`,
        content,
        branch: GITHUB_BRANCH,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        url: data.content?.html_url?.replace('github.com', 'raw.githubusercontent.com').replace(/\/$/, '') + `?raw=true`,
      }
    } else {
      return {
        success: false,
        error: data.message || '上传失败',
      }
    }
  } catch (error) {
    console.error('GitHub upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    }
  }
}

/**
 * 文件转 Base64
 * @param file - 文件对象
 * @returns Base64 字符串
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // 移除 data:image/jpeg;base64, 前缀
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

/**
 * 从 GitHub 删除文件
 * @param path - 文件路径
 * @returns 删除结果
 */
export async function deleteFromGitHub(path: string): Promise<{ success: boolean; error?: string }> {
  if (!GITHUB_TOKEN || !GITHUB_OWNER) {
    return {
      success: false,
      error: 'GitHub 配置不完整',
    }
  }

  try {
    // 先获取文件 SHA
    const getUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`
    const getResponse = await fetch(getUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!getResponse.ok) {
      return {
        success: false,
        error: '文件不存在',
      }
    }

    const fileData = await getResponse.json()

    // 删除文件
    const deleteUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`
    const deleteResponse = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Delete: ${path}`,
        sha: fileData.sha,
        branch: GITHUB_BRANCH,
      }),
    })

    if (deleteResponse.ok) {
      return { success: true }
    } else {
      const data = await deleteResponse.json()
      return {
        success: false,
        error: data.message || '删除失败',
      }
    }
  } catch (error) {
    console.error('GitHub delete error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    }
  }
}

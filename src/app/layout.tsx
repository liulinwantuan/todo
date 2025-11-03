import type { Metadata } from "next";
import AuthProvider from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "ToDo App - 三个版本的全功能任务管理系统",
  description: "基于 Next.js + Supabase + DeepSeek 构建，支持AI助手、画板功能、GitHub图床",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

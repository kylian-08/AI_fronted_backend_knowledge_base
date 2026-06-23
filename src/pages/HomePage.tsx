import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Palette, Boxes, Layers, Network } from 'lucide-react'
import { Layout, Header } from '@/components/layout/Layout'
import { SearchBar } from '@/components/catalog/SearchBar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { searchCatalog } from '@/lib/search'
import { cn } from '@/lib/utils'

const modules = [
  {
    to: '/styles',
    icon: Palette,
    title: 'UI 风格',
    desc: '浏览设计系统风格，统一 Showcase 横向对比，一键复制 Prompt',
    color: 'text-violet-400',
  },
  {
    to: '/components',
    icon: Boxes,
    title: 'UI 组件',
    desc: '模态框、表格、导航等可复用组件模板与预览',
    color: 'text-blue-400',
  },
  {
    to: '/backend',
    icon: Layers,
    title: '后端框架',
    desc: 'NestJS、FastAPI、Express、Django 等结构化后端 Prompt',
    color: 'text-emerald-400',
  },
  {
    to: '/architecture',
    icon: Network,
    title: '架构绘图',
    desc: '自定义框架蓝图设计（即将推出）',
    color: 'text-amber-400',
  },
]

export function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  async function handleSearch(q: string) {
    setQuery(q)
    if (q.trim().length < 2) return
    const results = await searchCatalog(q)
    if (results.length > 0) {
      const first = results[0]
      const paths: Record<string, string> = {
        style: '/styles',
        component: '/components',
        backend: '/backend',
      }
      navigate(`${paths[first.kind]}/${first.slug}`)
    }
  }

  return (
    <Layout>
      <Header>
        <SearchBar value={query} onChange={handleSearch} className="max-w-xl" />
      </Header>
      <main className="flex-1 p-4 md:p-8">
        <section className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">
            前端风格与组件 AI 提示词助手
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            浏览、搜索、复制高质量 UI 与后端 Prompt 模板。风格预览使用统一 Showcase 组件，便于横向对比、快速排除不喜欢的风格。
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(({ to, icon: Icon, title, desc, color }) => (
            <Link key={to} to={to}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <Icon className={cn('h-8 w-8', color)} />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">平台支持</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['浏览器 Web', 'PWA 手机端', 'Tauri 桌面 .exe/.app', 'Docker Linux 部署'].map(
              (item) => (
                <Card key={item}>
                  <CardContent className="py-4 text-sm text-muted-foreground">
                    {item}
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </section>
      </main>
    </Layout>
  )
}

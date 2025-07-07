'use client'

const stats = [
  { id: 1, name: '累计生成故事', value: '50,000+' },
  { id: 2, name: '用户满意度', value: '98.5%' },
  { id: 3, name: '平均响应时间', value: '2.8秒' },
  { id: 4, name: '活跃用户', value: '5,000+' },
]

export default function Stats() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              用户信赖的 AI 创作平台
            </h2>
            <p className="mt-4 text-lg/8 text-muted-foreground">
              数千用户已经在这里创作出了属于自己的精彩故事，加入我们，开启你的创作之旅。
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-secondary/10 p-8">
                <dt className="text-sm/6 font-semibold text-muted-foreground">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 
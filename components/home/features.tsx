'use client'

import { SparklesIcon, CpuChipIcon, BookOpenIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI 智能创作',
    description:
      '基于最新的 GPT-4o-mini 模型，为您提供高质量的故事生成服务。只需输入简单设定，即可获得精彩纷呈的职场逆袭爽文。',
    icon: SparklesIcon,
  },
  {
    name: '秒级响应',
    description:
      '采用 OpenRouter 高性能 API，确保快速响应。平均 3 秒内完成故事生成，让创意不再等待。',
    icon: CpuChipIcon,
  },
  {
    name: '无限创意',
    description:
      '支持多样化的故事设定和情节发展。从职场新人到行业精英，每个故事都独一无二，充满惊喜。',
    icon: BookOpenIcon,
  },
  {
    name: '开箱即用',
    description:
      '基于 Next.js 15 和现代技术栈构建，完善的订阅系统和用户管理。为开发者提供完整的 SaaS 解决方案。',
    icon: RocketLaunchIcon,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">强大的 AI 创作引擎</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            让每个人都成为故事创作者
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            我们的 AI 驱动平台将创意写作变得前所未有的简单。无论您是想要放松娱乐，
            还是寻找创作灵感，都能在这里找到属于自己的精彩故事。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-primary-foreground" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    id: 1,
    question: "AI 生成的故事质量如何？",
    answer:
      "我们使用 OpenAI 的 GPT-4o-mini 模型，这是目前最先进的 AI 语言模型之一。生成的故事具有丰富的情节、合理的逻辑和流畅的语言表达。每个故事都根据您的设定进行定制，确保内容的独特性和相关性。",
  },
  {
    id: 2,
    question: "我需要付费才能使用吗？",
    answer:
      "平台提供多种订阅方案和积分包。您可以选择月度或年度订阅获得无限次生成，也可以购买积分包按需使用。我们还为新用户提供免费试用，让您先体验服务质量。",
  },
  {
    id: 3,
    question: "生成故事需要多长时间？",
    answer:
      "通常只需要 2-5 秒就能生成一个完整的故事段落。我们的系统经过优化，确保快速响应。即使在高峰期，您也能享受到流畅的创作体验。",
  },
  {
    id: 4,
    question: "我可以自定义故事的风格和长度吗？",
    answer:
      "当前版本支持基于老板姓名和故事题目的定制。我们正在开发更多个性化选项，包括故事风格、长度设置、角色性格等。这些功能将在后续版本中逐步推出。",
  },
  {
    id: 5,
    question: "生成的内容安全吗？会涉及敏感信息吗？",
    answer:
      "我们的 AI 模型经过严格的内容安全训练，生成的故事内容积极正面，不涉及暴力、色情或其他敏感内容。所有故事都围绕职场成长和正能量主题展开。",
  },
  {
    id: 6,
    question: "我可以分享或商用生成的故事吗？",
    answer:
      "生成的故事内容您拥有完全的使用权。您可以自由分享、编辑或用于个人创作。如需商业用途，请查看我们的服务条款了解具体规定。",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">常见问题</h2>
        <dl className="mt-20 divide-y divide-foreground/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-foreground lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 
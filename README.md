# AI 故事创作平台 - Raphael Starter Kit

基于 Next.js、Supabase 和 Creem.io 构建的智能故事生成平台。让 AI 成为您的专属编剧，输入简单设定，即可获得精彩的职场逆袭爽文故事。

## 🌟 产品简介

这是一个革命性的 AI 驱动创意写作平台，专为"重生之老板是我小秘"主题故事生成而设计。我们使用最先进的 GPT-4o-mini 模型，为用户提供高质量、个性化的故事创作服务。

### ✨ 核心功能

- 🤖 **AI 智能创作**
  - 基于 OpenAI GPT-4o-mini 模型
  - 3秒内生成精彩故事段落
  - 支持个性化设定（老板姓名 + 故事题目）
  - 积极正面的内容，充满正能量

- 💡 **创作体验**
  - 简洁直观的操作界面
  - 实时生成，即输即得
  - 故事收藏和管理
  - 多样化的情节发展

- 💳 **灵活的付费模式**
  - 订阅制：无限次生成
  - 积分制：按需购买使用
  - 多种套餐满足不同需求
  - 全球支付支持

## 🎯 适用场景

- **个人娱乐**：轻松获得专属定制的爽文故事
- **创作灵感**：为写作提供创意素材和参考
- **社交分享**：生成有趣内容与朋友分享
- **教育训练**：学习故事结构和写作技巧

## 🚀 技术特色

- 💯 **现代化技术栈**
  - Next.js 15 + React 19
  - TypeScript 类型安全
  - TailwindCSS + Shadcn UI
  - 响应式设计，完美适配各种设备

- 🔐 **完整的用户系统**
  - 基于 Supabase 的身份验证
  - 邮箱密码登录 + OAuth 支持
  - 安全的会话管理
  - 用户数据保护

- 🎨 **精美的界面设计**
  - 深色/浅色主题切换
  - 流畅的动画效果
  - 专业的视觉设计
  - 优秀的用户体验

## 🛠️ 技术架构

### AI 服务集成

```typescript
// OpenRouter API 集成
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 800,
  }),
});
```

### 订阅管理

```typescript
// 支持订阅和积分两种模式
export const SUBSCRIPTION_TIERS = [
  {
    name: "创作新手",
    priceMonthly: "$11",
    features: ["每月 50 次故事生成", "基础故事模板", "标准响应速度"]
  },
  {
    name: "创作达人", 
    priceMonthly: "$29",
    features: ["每月 200 次故事生成", "高级故事模板", "优先响应速度"]
  }
];
```

## 📦 快速开始

### 环境要求

- Node.js 18+ 和 npm
- Supabase 账户
- Creem.io 账户  
- OpenRouter API 密钥

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/ai-story-generator.git
   cd ai-story-generator
   npm install
   ```

2. **环境配置**
   ```bash
   cp .env.example .env.local
   ```

   配置环境变量：
   ```env
   # Supabase 配置
   NEXT_PUBLIC_SUPABASE_URL=你的supabase项目URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的supabase匿名密钥
   SUPABASE_SERVICE_ROLE_KEY=你的supabase服务角色密钥

   # Creem.io 支付配置
   CREEM_API_KEY=你的creem_api_密钥
   CREEM_API_URL=https://test-api.creem.io/v1
   CREEM_WEBHOOK_SECRET=你的webhook密钥
   CREEM_SUCCESS_URL=http://localhost:3000/dashboard

   # OpenRouter AI 配置
   OPENROUTER_API_KEY=你的openrouter_api_密钥

   # 站点配置
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **数据库设置**
   ```bash
   # 在 Supabase SQL 编辑器中执行
   supabase/migrations/20240326000000_init_tables.sql
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

   访问 [http://localhost:3000](http://localhost:3000) 开始体验！

### OpenRouter API 配置

1. 访问 [OpenRouter.ai](https://openrouter.ai)
2. 注册账户并获取 API 密钥
3. 选择 GPT-4o-mini 模型
4. 将 API 密钥添加到环境变量

### Creem.io 支付配置

1. 注册 [Creem.io](https://creem.io) 账户
2. 创建订阅产品和积分产品
3. 配置 Webhook 回调地址：`https://你的域名/api/webhooks/creem`
4. 获取 API 密钥和 Webhook 密钥

## 📱 功能展示

### 1. AI 故事生成
- 输入老板姓名（如：张总、李总）
- 设定故事题目（如：职场新人的逆袭之路）
- 3秒内获得精彩故事段落

### 2. 订阅管理
- **创作新手**：$11/月，50次生成
- **创作达人**：$29/月，200次生成  
- **创作大师**：$99/月，无限生成

### 3. 积分系统
- **体验包**：$9，3次生成
- **进阶包**：$13，6次生成
- **专业包**：$29，9次生成

## 🎨 界面设计

### 主页英雄区域
```tsx
<h1 className="text-4xl font-bold">
  <span className="block">重生之</span>
  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    AI 创作时代
  </span>
</h1>
```

### AI 生成器组件
```tsx
<Card>
  <CardHeader>
    <CardTitle>故事设定</CardTitle>
  </CardHeader>
  <CardContent>
    <Input placeholder="例如：张总、李总、王总..." />
    <Input placeholder="例如：职场新人的逆袭之路..." />
    <Button onClick={handleGenerate}>
      <Sparkles className="w-4 h-4 mr-2" />
      开始生成
    </Button>
  </CardContent>
</Card>
```

## 🔧 部署指南

### Vercel 部署

1. 推送代码到 GitHub
2. 连接 Vercel 账户
3. 配置环境变量
4. 一键部署

### 环境变量配置

确保在生产环境中配置所有必要的环境变量：

- Supabase 配置
- Creem.io 支付配置  
- OpenRouter API 密钥
- 站点 URL 配置

## 📊 项目结构

```
├── app/
│   ├── api/ai/generate-story/    # AI 故事生成 API
│   ├── api/webhooks/creem/       # 支付回调处理
│   └── page.tsx                  # 主页面
├── components/
│   ├── product/                  # 产品功能组件
│   │   └── ai-story-generator.tsx # AI 故事生成器
│   ├── home/                     # 首页组件
│   └── ui/                       # 基础 UI 组件
├── config/
│   └── subscriptions.ts          # 订阅配置
├── hooks/                        # 自定义 Hooks
├── utils/                        # 工具函数
└── types/                        # TypeScript 类型
```

## 🎯 产品路线图

### 已实现功能 ✅
- [x] AI 故事生成核心功能
- [x] 用户注册登录系统
- [x] 订阅和积分支付系统
- [x] 响应式界面设计
- [x] 深色/浅色主题

### 计划中功能 🚧
- [ ] 故事风格自定义
- [ ] 多语言支持
- [ ] 故事长度设置
- [ ] 批量生成功能
- [ ] 社区分享功能
- [ ] 移动端 APP

## 🤝 贡献指南

我们欢迎社区贡献！请参考以下步骤：

1. Fork 此仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💬 支持与联系

- 📧 邮箱：support@example.com
- 💬 微信：请扫描二维码
- 🐛 问题反馈：[GitHub Issues](https://github.com/yourusername/ai-story-generator/issues)

## 🙏 致谢

感谢以下技术和服务提供商：

- [OpenAI](https://openai.com) - 提供强大的 AI 模型
- [OpenRouter](https://openrouter.ai) - 便捷的 AI API 服务
- [Supabase](https://supabase.com) - 现代化后端服务
- [Creem.io](https://creem.io) - 全球支付解决方案
- [Vercel](https://vercel.com) - 优秀的部署平台

---

⭐ 如果这个项目对您有帮助，请给我们一个 Star！

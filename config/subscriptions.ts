import { ProductTier } from "@/types/subscriptions";

export const SUBSCRIPTION_TIERS: ProductTier[] = [
  {
    name: "创作新手",
    id: "tier-hobby",
    productId: "prod_5lkRx5tsDT13HyYoQ5EWb1", // $11 monthly subscription
    priceMonthly: "$11",
    description: "适合个人用户和初次体验 AI 创作的用户。",
    features: [
      "每月 50 次故事生成",
      "基础故事模板",
      "标准响应速度",
      "社区论坛支持",
      "基础用户界面",
      "故事导出功能",
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
  {
    name: "创作达人",
    id: "tier-pro",
    productId: "prod_3KvkFFEiGGjnF4bgHBjl18", // $29 monthly subscription
    priceMonthly: "$29",
    description: "适合频繁使用 AI 创作的用户和小团队。",
    features: [
      "每月 200 次故事生成",
      "高级故事模板",
      "优先响应速度",
      "邮件技术支持",
      "故事收藏和管理",
      "高级导出选项",
      "创作历史记录",
    ],
    featured: true,
    discountCode: "WELCOME", // Optional discount code
  },
  {
    name: "创作大师",
    id: "tier-enterprise",
    productId: "prod_3qPYksZMtk94wQsdkgajrJ", // $99 monthly subscription
    priceMonthly: "$99",
    description: "适合专业创作者和企业级用户。",
    features: [
      "无限次故事生成",
      "所有故事模板",
      "最高优先级响应",
      "专属客户经理",
      "自定义故事风格",
      "API 访问权限",
      "数据分析报告",
      "白标解决方案",
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
];

export const CREDITS_TIERS: ProductTier[] = [
  {
    name: "体验包",
    id: "tier-3-credits",
    productId: "prod_MqcjVo0Bpx0rbYmHVlrh2", // $9 one-time purchase
    priceMonthly: "$9",
    description: "3 个积分，适合初次体验和轻度使用。",
    creditAmount: 3,
    features: [
      "3 次 AI 故事生成",
      "永不过期",
      "基础故事模板",
      "社区支持"
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
  {
    name: "进阶包",
    id: "tier-6-credits",
    productId: "prod_4ICkTovEC6o9QY6UuL3aI0", // $13 one-time purchase
    priceMonthly: "$13",
    description: "6 个积分，适合中度使用和项目试验。",
    creditAmount: 6,
    features: [
      "6 次 AI 故事生成",
      "永不过期",
      "优先处理速度",
      "邮件基础支持"
    ],
    featured: true,
    discountCode: "", // Optional discount code
  },
  {
    name: "专业包",
    id: "tier-9-credits",
    productId: "prod_3b3oyQtIJA3eaMIHLNjyCc", // $29 one-time purchase
    priceMonthly: "$29",
    description: "9 个积分，适合高频使用和专业创作。",
    creditAmount: 9,
    features: [
      "9 次 AI 故事生成",
      "永不过期",
      "高级故事模板",
      "优先技术支持"
    ],
    featured: false,
    discountCode: "", // Optional discount code
  },
];

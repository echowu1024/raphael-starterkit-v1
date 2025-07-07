import { StoryScenario, CharacterGrowthLevel } from "@/types/story";

export const STORY_SCENARIOS: StoryScenario[] = [
  {
    id: "classic-ceo",
    name: "霸道总裁",
    description: "经典霸道总裁爱上小秘书的故事",
    icon: "👑",
    color: "from-amber-500 to-orange-600",
    themes: ["权力", "财富", "浪漫", "逆袭"],
    promptTemplate: `你是一个专业的霸道总裁爽文作家。请根据以下信息，创作一个经典的"霸道总裁爱上小秘书"类型的故事段落：

老板姓名：{bossName}
故事题目：{storyTitle}
{characterInfo}

要求：
1. 突出总裁的霸道和权势，以及小秘书的聪慧与独立
2. 情节充满戏剧性，包含误会、心动、保护等经典桥段
3. 语言风格优雅浪漫，充满张力
4. 字数控制在400-600字之间
5. 展现职场与爱情的完美结合

请开始创作：`
  },
  {
    id: "wealthy-family",
    name: "豪门世家",
    description: "豪门恩怨与灰姑娘的逆袭传奇",
    icon: "🏰",
    color: "from-purple-500 to-pink-600",
    themes: ["豪门", "恩怨", "逆袭", "身世"],
    promptTemplate: `你是一个专业的豪门世家爽文作家。请根据以下信息，创作一个"豪门恩怨"类型的故事段落：

老板姓名：{bossName}
故事题目：{storyTitle}
{characterInfo}

要求：
1. 展现豪门世家的奢华与复杂人际关系
2. 突出主角的不凡身世或隐藏实力
3. 包含家族斗争、继承权、商业博弈等元素
4. 情节跌宕起伏，充满反转
5. 字数控制在400-600字之间

请开始创作：`
  },
  {
    id: "sweet-romance",
    name: "甜宠日常",
    description: "温馨甜蜜的职场恋爱日常",
    icon: "🍯",
    color: "from-pink-400 to-rose-500",
    themes: ["甜蜜", "日常", "温馨", "治愈"],
    promptTemplate: `你是一个专业的甜宠文作家。请根据以下信息，创作一个温馨甜蜜的职场恋爱故事：

老板姓名：{bossName}
故事题目：{storyTitle}
{characterInfo}

要求：
1. 情节轻松温馨，充满甜蜜互动
2. 展现日常工作中的小美好和小浪漫
3. 语言风格轻快治愈，让人心情愉悦
4. 注重细节描写，营造温馨氛围
5. 字数控制在400-600字之间

请开始创作：`
  },
  {
    id: "fantasy-urban",
    name: "现代玄幻",
    description: "都市修仙与商业帝国的碰撞",
    icon: "⚡",
    color: "from-blue-500 to-cyan-600",
    themes: ["修仙", "都市", "异能", "强者"],
    promptTemplate: `你是一个专业的现代玄幻爽文作家。请根据以下信息，创作一个都市修仙类型的故事段落：

老板姓名：{bossName}
故事题目：{storyTitle}
{characterInfo}

要求：
1. 融合现代都市与修仙元素
2. 展现主角的特殊能力或修仙实力
3. 包含商业竞争与超自然力量的结合
4. 情节充满想象力，打斗场面精彩
5. 字数控制在400-600字之间

请开始创作：`
  },
  {
    id: "rebirth-revenge",
    name: "重生复仇",
    description: "重生归来，华丽复仇的逆袭之路",
    icon: "🔥",
    color: "from-red-500 to-red-700",
    themes: ["重生", "复仇", "逆袭", "智斗"],
    promptTemplate: `你是一个专业的重生复仇爽文作家。请根据以下信息，创作一个重生复仇类型的故事段落：

老板姓名：{bossName}
故事题目：{storyTitle}
{characterInfo}

要求：
1. 展现主角重生后的智慧与手段
2. 包含复仇计划的精妙布局
3. 突出前世今生的对比与成长
4. 情节紧张刺激，智斗精彩
5. 字数控制在400-600字之间

请开始创作：`
  },
  {
    id: "school-youth",
    name: "校园青春",
    description: "青春校园里的美好爱情故事",
    icon: "🎓",
    color: "from-green-400 to-blue-500",
    themes: ["校园", "青春", "初恋", "成长"],
    promptTemplate: `你是一个专业的校园青春文作家。请根据以下信息，创作一个校园青春类型的故事段落：

老板姓名：{bossName}（可以是学长、老师或校园人物）
故事题目：{storyTitle}
{characterInfo}

要求：
1. 展现青春校园的美好与纯真
2. 包含学习、友情、爱情等青春元素
3. 情节清新自然，充满正能量
4. 语言风格青春活泼，贴近年轻人
5. 字数控制在400-600字之间

请开始创作：`
  }
];

export const CHARACTER_GROWTH_LEVELS: CharacterGrowthLevel[] = [
  {
    level: 1,
    requiredExperience: 0,
    title: "职场新人",
    description: "刚刚踏入职场的青涩新人",
    unlockedFeatures: ["基础故事生成", "简单角色设定"]
  },
  {
    level: 2,
    requiredExperience: 5,
    title: "能干助理",
    description: "开始展现工作能力的得力助手",
    unlockedFeatures: ["性格深度定制", "背景故事编辑"]
  },
  {
    level: 3,
    requiredExperience: 15,
    title: "精英秘书",
    description: "备受信赖的专业秘书",
    unlockedFeatures: ["多角色互动", "复杂情节生成"]
  },
  {
    level: 4,
    requiredExperience: 30,
    title: "贴身管家",
    description: "无所不能的贴身管家",
    unlockedFeatures: ["高级场景定制", "角色关系网络"]
  },
  {
    level: 5,
    requiredExperience: 50,
    title: "商业伙伴",
    description: "平起平坐的商业伙伴",
    unlockedFeatures: ["自定义剧情走向", "多线程故事发展"]
  },
  {
    level: 6,
    requiredExperience: 80,
    title: "传奇女王",
    description: "掌控一切的传奇女王",
    unlockedFeatures: ["所有高级功能", "专属故事模板", "AI角色记忆"]
  }
];

export const PERSONALITY_TRAITS = [
  "聪明机智", "温柔体贴", "坚强独立", "幽默风趣",
  "神秘冷酷", "活泼开朗", "沉稳内敛", "勇敢果断"
];

export const IDENTITY_OPTIONS = [
  "秘书助理", "实习生", "部门主管", "项目经理",
  "金融分析师", "设计师", "程序员", "销售代表"
]; 
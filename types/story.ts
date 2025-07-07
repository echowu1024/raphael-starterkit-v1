export interface StoryScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  themes: string[];
  promptTemplate: string;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  personality: string[];
  identity: string;
  background: string;
  level: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterGrowthLevel {
  level: number;
  requiredExperience: number;
  title: string;
  description: string;
  unlockedFeatures: string[];
}

export interface StoryGeneration {
  id: string;
  userId: string;
  characterId?: string;
  scenarioId: string;
  bossName: string;
  storyTitle: string;
  generatedStory: string;
  createdAt: string;
}

export type PersonalityTrait = 
  | "聪明机智" 
  | "温柔体贴" 
  | "坚强独立" 
  | "幽默风趣" 
  | "神秘冷酷" 
  | "活泼开朗" 
  | "沉稳内敛" 
  | "勇敢果断";

export type IdentityType = 
  | "秘书助理" 
  | "实习生" 
  | "部门主管" 
  | "项目经理" 
  | "金融分析师" 
  | "设计师" 
  | "程序员" 
  | "销售代表"; 
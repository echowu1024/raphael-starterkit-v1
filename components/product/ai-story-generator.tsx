'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, User, BookOpen, Crown, Castle, Honey, Zap, Flame, GraduationCap, Star, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { STORY_SCENARIOS, CHARACTER_GROWTH_LEVELS, PERSONALITY_TRAITS, IDENTITY_OPTIONS } from "@/config/story-scenarios";
import { StoryScenario, Character, PersonalityTrait, IdentityType } from "@/types/story";
import { getUserCharacter, createCharacter, updateCharacter, saveStoryGeneration } from "@/utils/supabase/characters";

interface GeneratedStory {
  story: string;
  bossName: string;
  storyTitle: string;
  scenarioId: string;
  characterId?: string;
}

const scenarioIcons = {
  "classic-ceo": Crown,
  "wealthy-family": Castle,
  "sweet-romance": Honey,
  "fantasy-urban": Zap,
  "rebirth-revenge": Flame,
  "school-youth": GraduationCap,
};

export default function AIStoryGenerator() {
  const [bossName, setBossName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<StoryScenario>(STORY_SCENARIOS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  
  // Character creation states
  const [characterName, setCharacterName] = useState("");
  const [selectedPersonality, setSelectedPersonality] = useState<PersonalityTrait[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<IdentityType>("秘书助理");
  const [characterBackground, setCharacterBackground] = useState("");
  
  const { toast } = useToast();
  const { user } = useUser();

  // Load user's character on component mount
  useEffect(() => {
    if (user) {
      loadUserCharacter();
    }
  }, [user]);

  const loadUserCharacter = async () => {
    if (!user?.id) return;
    
    try {
      const character = await getUserCharacter(user.id);
      if (character) {
        setCurrentCharacter(character);
        setCharacterName(character.name);
        setSelectedPersonality(character.personality as PersonalityTrait[]);
        setSelectedIdentity(character.identity as IdentityType);
        setCharacterBackground(character.background);
      }
    } catch (error) {
      console.error('Error loading user character:', error);
    }
  };

  const getCurrentLevel = (experience: number) => {
    const level = CHARACTER_GROWTH_LEVELS.reduce((prev, curr) => {
      return experience >= curr.requiredExperience ? curr : prev;
    }, CHARACTER_GROWTH_LEVELS[0]);
    return level;
  };

  const getProgressToNextLevel = (experience: number) => {
    const currentLevel = getCurrentLevel(experience);
    const nextLevel = CHARACTER_GROWTH_LEVELS.find(level => level.requiredExperience > experience);
    
    if (!nextLevel) return 100;
    
    const currentLevelExp = currentLevel.requiredExperience;
    const nextLevelExp = nextLevel.requiredExperience;
    const progress = ((experience - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
    
    return Math.min(100, Math.max(0, progress));
  };

  const handlePersonalityToggle = (trait: PersonalityTrait) => {
    setSelectedPersonality(prev => 
      prev.includes(trait) 
        ? prev.filter(p => p !== trait)
        : prev.length < 3 ? [...prev, trait] : prev
    );
  };

  const saveCharacter = async () => {
    if (!characterName.trim() || selectedPersonality.length === 0) {
      toast({
        title: "请完善角色信息",
        description: "角色姓名和性格特征是必填项",
        variant: "destructive",
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "请先登录",
        description: "需要登录后才能保存角色",
        variant: "destructive",
      });
      return;
    }

    try {
      const characterData = {
        name: characterName.trim(),
        personality: selectedPersonality,
        identity: selectedIdentity,
        background: characterBackground.trim(),
        level: currentCharacter?.level || 1,
        experience: currentCharacter?.experience || 0,
      };

      let savedCharacter: Character | null = null;

      if (currentCharacter?.id) {
        // Update existing character
        savedCharacter = await updateCharacter(currentCharacter.id, characterData);
      } else {
        // Create new character
        savedCharacter = await createCharacter({
          ...characterData,
          userId: user.id,
        });
      }

      if (savedCharacter) {
        setCurrentCharacter(savedCharacter);
        setShowCharacterCreator(false);
        
        toast({
          title: "角色保存成功！",
          description: currentCharacter?.id ? "角色信息已更新" : "您的专属角色已经创建完成",
        });
      } else {
        throw new Error("保存失败");
      }
    } catch (error) {
      console.error('Error saving character:', error);
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    }
  };

  const buildCharacterInfo = () => {
    if (!currentCharacter) return "";
    
    return `
角色信息：
- 姓名：${currentCharacter.name}
- 身份：${currentCharacter.identity}
- 性格：${currentCharacter.personality.join("、")}
- 等级：${getCurrentLevel(currentCharacter.experience).title} (Lv.${getCurrentLevel(currentCharacter.experience).level})
- 背景：${currentCharacter.background}`;
  };

  const handleGenerate = async () => {
    if (!bossName.trim() || !storyTitle.trim()) {
      toast({
        title: "请填写完整信息",
        description: "老板姓名和故事题目都是必填项",
        variant: "destructive",
      });
      return;
    }

    if (!user || !user.email) {
      toast({
        title: "请先登录",
        description: "需要登录后才能使用AI创作功能",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/ai/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bossName: bossName.trim(),
          storyTitle: storyTitle.trim(),
          scenarioId: selectedScenario.id,
          characterInfo: currentCharacter ? buildCharacterInfo() : "",
        }),
      });

      if (!response.ok) {
        throw new Error("生成失败，请稍后重试");
      }

      const data = await response.json();
      const generatedStoryData = {
        ...data,
        scenarioId: selectedScenario.id,
        characterId: currentCharacter?.id
      };
      
      setGeneratedStory(generatedStoryData);

      // Save story to database
      try {
        await saveStoryGeneration({
          userId: user.id,
          characterId: currentCharacter?.id,
          scenarioId: selectedScenario.id,
          bossName: bossName.trim(),
          storyTitle: storyTitle.trim(),
          generatedStory: data.story,
        });
      } catch (error) {
        console.error('Error saving story generation:', error);
      }

      // Add experience to character
      if (currentCharacter?.id) {
        const newExperience = currentCharacter.experience + 1;
        const updatedCharacter = await updateCharacter(currentCharacter.id, {
          experience: newExperience
        });
        
        if (updatedCharacter) {
          setCurrentCharacter(updatedCharacter);
          
          // Check for level up
          const newLevel = getCurrentLevel(newExperience);
          const oldLevel = getCurrentLevel(currentCharacter.experience);
          if (newLevel.level > oldLevel.level) {
            toast({
              title: "🎉 角色升级！",
              description: `${currentCharacter.name} 升级到了 ${newLevel.title}！`,
              duration: 5000,
            });
          }
        }
      }
      
      toast({
        title: "生成成功！",
        description: "您的专属爽文故事已经生成完成",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "生成失败",
        description: error instanceof Error ? error.message : "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setBossName("");
    setStoryTitle("");
    setGeneratedStory(null);
  };

  return (
    <div id="ai-story-generator" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI 爽文生成器 2.0</span>
            </div>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            重生之老板是我小秘
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            选择您喜爱的故事场景，自定义专属角色，AI 为您量身定制精彩的爽文故事
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-8">
          {/* Character Info */}
          {currentCharacter && (
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      我的角色：{currentCharacter.name}
                    </CardTitle>
                    <CardDescription>
                      {getCurrentLevel(currentCharacter.experience).title} • Lv.{getCurrentLevel(currentCharacter.experience).level}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCharacterCreator(true)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    编辑角色
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">性格：</span>
                    {currentCharacter.personality.map((trait) => (
                      <span key={trait} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>经验值：{currentCharacter.experience}</span>
                      <span>{Math.round(getProgressToNextLevel(currentCharacter.experience))}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressToNextLevel(currentCharacter.experience)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Character Creator Modal */}
          {showCharacterCreator && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>角色定制</CardTitle>
                <CardDescription>
                  打造您的专属角色，让AI根据角色特性生成更精彩的故事
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">角色姓名</label>
                    <Input
                      placeholder="例如：林小雅、苏晴..."
                      value={characterName}
                      onChange={(e) => setCharacterName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">职业身份</label>
                    <select 
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      value={selectedIdentity}
                      onChange={(e) => setSelectedIdentity(e.target.value as IdentityType)}
                    >
                      {IDENTITY_OPTIONS.map((identity) => (
                        <option key={identity} value={identity}>{identity}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">性格特征 (最多选择3个)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {PERSONALITY_TRAITS.map((trait) => (
                      <Button
                        key={trait}
                        variant={selectedPersonality.includes(trait as PersonalityTrait) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePersonalityToggle(trait as PersonalityTrait)}
                        disabled={!selectedPersonality.includes(trait as PersonalityTrait) && selectedPersonality.length >= 3}
                      >
                        {trait}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">角色背景</label>
                  <textarea
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    rows={3}
                    placeholder="描述角色的教育背景、工作经历或特殊技能..."
                    value={characterBackground}
                    onChange={(e) => setCharacterBackground(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={saveCharacter} className="flex-1">
                    <Star className="w-4 h-4 mr-2" />
                    保存角色
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCharacterCreator(false)}
                  >
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scenario Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                故事场景选择
              </CardTitle>
              <CardDescription>
                选择您喜爱的故事类型，体验不同风格的爽文世界
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STORY_SCENARIOS.map((scenario) => {
                  const IconComponent = scenarioIcons[scenario.id as keyof typeof scenarioIcons] || Sparkles;
                  return (
                    <div
                      key={scenario.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedScenario.id === scenario.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${scenario.color} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{scenario.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.themes.map((theme) => (
                          <span key={theme} className="px-2 py-1 bg-secondary text-xs rounded-full">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Story Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const IconComponent = scenarioIcons[selectedScenario.id as keyof typeof scenarioIcons] || Sparkles;
                  return <IconComponent className="w-5 h-5" />;
                })()}
                {selectedScenario.name} 故事设定
              </CardTitle>
              <CardDescription>
                请输入故事的基本信息，AI 将结合您的角色和选定场景创作精彩内容
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="boss-name" className="text-sm font-medium leading-none">
                  <User className="w-4 h-4 inline mr-2" />
                  {selectedScenario.id === 'school-youth' ? '角色姓名' : '老板姓名'}
                </label>
                <Input
                  id="boss-name"
                  placeholder={selectedScenario.id === 'school-youth' ? "例如：学长、老师、同学..." : "例如：张总、李总、王总..."}
                  value={bossName}
                  onChange={(e) => setBossName(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="story-title" className="text-sm font-medium leading-none">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  故事题目
                </label>
                <Input
                  id="story-title"
                  placeholder="例如：职场新人的逆袭之路、意外的心动瞬间..."
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI 创作中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      开始生成
                    </>
                  )}
                </Button>
                
                {generatedStory && (
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isGenerating}
                  >
                    重新创作
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Generated Story */}
          {generatedStory && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  您的专属 {STORY_SCENARIOS.find(s => s.id === generatedStory.scenarioId)?.name} 故事
                </CardTitle>
                <CardDescription>
                  主角：{generatedStory.bossName} | 题目：{generatedStory.storyTitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/50 rounded-lg p-6">
                    {generatedStory.story}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Character CTA */}
          {!currentCharacter && (
            <Card className="border-dashed border-2 border-primary/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">创建您的专属角色</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      定制角色属性，让AI生成更符合您喜好的个性化故事
                    </p>
                    <Button onClick={() => setShowCharacterCreator(true)}>
                      <Star className="w-4 h-4 mr-2" />
                      创建角色
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 
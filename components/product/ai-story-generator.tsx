'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, User, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedStory {
  story: string;
  bossName: string;
  storyTitle: string;
}

export default function AIStoryGenerator() {
  const [bossName, setBossName] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!bossName.trim() || !storyTitle.trim()) {
      toast({
        title: "请填写完整信息",
        description: "老板姓名和故事题目都是必填项",
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
        }),
      });

      if (!response.ok) {
        throw new Error("生成失败，请稍后重试");
      }

      const data = await response.json();
      setGeneratedStory(data);
      
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
              <span className="text-sm font-medium text-primary">AI 爽文生成器</span>
            </div>
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            重生之老板是我小秘
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            输入老板姓名和故事题目，AI 为您量身定制专属的职场逆袭爽文故事
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                故事设定
              </CardTitle>
              <CardDescription>
                请输入故事的基本信息，AI 将为您创作精彩内容
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="boss-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <User className="w-4 h-4 inline mr-2" />
                  老板姓名
                </label>
                <Input
                  id="boss-name"
                  placeholder="例如：张总、李总、王总..."
                  value={bossName}
                  onChange={(e) => setBossName(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="story-title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  故事题目
                </label>
                <Input
                  id="story-title"
                  placeholder="例如：职场新人的逆袭之路、小秘书的华丽转身..."
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

          {generatedStory && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  您的专属故事
                </CardTitle>
                <CardDescription>
                  主角：{generatedStory.bossName} | 题目：{generatedStory.storyTitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/50 rounded-lg p-4">
                    {generatedStory.story}
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
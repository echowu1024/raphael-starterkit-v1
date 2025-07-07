'use client'

import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Zap, ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToAIGenerator = () => {
    const aiSection = document.querySelector('#ai-story-generator');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background">
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
              <Sparkles className="w-4 h-4" />
              AI 驱动的创意写作平台
              <ArrowRight className="w-4 h-4" />
            </div>

            {/* Main headline */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="block">重生之</span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI 创作时代
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              让 AI 成为你的专属编剧，输入简单的设定，获得精彩的职场逆袭爽文。
              从平凡小秘到职场精英，每个人都有属于自己的华丽转身故事。
            </p>

            {/* Features highlight */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                智能故事生成
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                秒级创作体验
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                无限创意可能
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={scrollToAIGenerator}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                开始创作你的故事
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#features">
                  了解更多功能
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10,000+</div>
                <div className="text-sm text-muted-foreground">生成故事数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">用户满意度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">3秒</div>
                <div className="text-sm text-muted-foreground">平均生成时间</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  )
}

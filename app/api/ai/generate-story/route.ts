import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { bossName, storyTitle } = await request.json();

    if (!bossName || !storyTitle) {
      return NextResponse.json(
        { error: "Boss name and story title are required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `你是一个专业的爽文小说作家。请根据以下信息，创作一个有趣的"重生之老板是我小秘"类型的爽文故事段落：

老板姓名：${bossName}
故事题目：${storyTitle}

要求：
1. 故事内容积极正面，充满正能量
2. 情节有趣且富有创意
3. 字数控制在300-500字之间
4. 语言风格轻松幽默
5. 体现职场逆袭的主题

请开始创作：`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Raphael Starter Kit - AI Story Generator",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate story content" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedStory = data.choices[0]?.message?.content;

    if (!generatedStory) {
      return NextResponse.json(
        { error: "No story content generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      story: generatedStory,
      bossName,
      storyTitle,
    });

  } catch (error) {
    console.error("Story generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from "next/server";
import { STORY_SCENARIOS } from '@/config/story-scenarios';

export async function POST(request: NextRequest) {
  try {
    const { bossName, storyTitle, scenarioId, characterInfo } = await request.json();

    if (!bossName || !storyTitle || !scenarioId) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // Find the selected scenario
    const scenario = STORY_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) {
      return NextResponse.json(
        { error: '无效的故事场景' },
        { status: 400 }
      );
    }

    // Build the prompt with scenario template and character info
    let prompt = scenario.promptTemplate
      .replace('{bossName}', bossName)
      .replace('{storyTitle}', storyTitle)
      .replace('{characterInfo}', characterInfo || '');

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "AI Story Generator",
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
        max_tokens: 1000,
        stream: false
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter API');
    }

    const story = data.choices[0].message.content;

    return NextResponse.json({
      story,
      bossName,
      storyTitle,
      scenarioId,
      scenario: scenario.name
    });

  } catch (error) {
    console.error("Story generation error:", error);
    return NextResponse.json(
      { error: "故事生成失败，请稍后重试" },
      { status: 500 }
    );
  }
} 
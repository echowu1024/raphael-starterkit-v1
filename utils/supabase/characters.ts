import { createClient } from '@/utils/supabase/client';
import { Character, StoryGeneration } from '@/types/story';

export async function getUserCharacter(userId: string): Promise<Character | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user character:', error);
    return null;
  }

  return data;
}

export async function createCharacter(characterData: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>): Promise<Character | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('characters')
    .insert({
      user_id: characterData.userId,
      name: characterData.name,
      personality: characterData.personality,
      identity: characterData.identity,
      background: characterData.background,
      level: characterData.level,
      experience: characterData.experience,
    })
    .select('*')
    .single();

  if (error) {
    console.error('Error creating character:', error);
    return null;
  }

  return data;
}

export async function updateCharacter(characterId: string, updates: Partial<Character>): Promise<Character | null> {
  const supabase = createClient();
  
  const updateData: any = {};
  
  if (updates.name) updateData.name = updates.name;
  if (updates.personality) updateData.personality = updates.personality;
  if (updates.identity) updateData.identity = updates.identity;
  if (updates.background !== undefined) updateData.background = updates.background;
  if (updates.level) updateData.level = updates.level;
  if (updates.experience !== undefined) updateData.experience = updates.experience;

  const { data, error } = await supabase
    .from('characters')
    .update(updateData)
    .eq('id', characterId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating character:', error);
    return null;
  }

  return data;
}

export async function saveStoryGeneration(storyData: Omit<StoryGeneration, 'id' | 'createdAt'>): Promise<StoryGeneration | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('story_generations')
    .insert({
      user_id: storyData.userId,
      character_id: storyData.characterId,
      scenario_id: storyData.scenarioId,
      boss_name: storyData.bossName,
      story_title: storyData.storyTitle,
      generated_story: storyData.generatedStory,
    })
    .select('*')
    .single();

  if (error) {
    console.error('Error saving story generation:', error);
    return null;
  }

  return data;
}

export async function getUserStoryHistory(userId: string, limit: number = 10): Promise<StoryGeneration[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('story_generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching story history:', error);
    return [];
  }

  return data || [];
}

export async function deleteCharacter(characterId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', characterId);

  if (error) {
    console.error('Error deleting character:', error);
    return false;
  }

  return true;
} 
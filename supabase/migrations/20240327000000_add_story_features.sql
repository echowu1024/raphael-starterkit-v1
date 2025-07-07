-- Add tables for character system and story generation

-- Characters table for user-created characters
CREATE TABLE IF NOT EXISTS characters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  personality TEXT[] NOT NULL DEFAULT '{}',
  identity TEXT NOT NULL,
  background TEXT DEFAULT '',
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Story generations table to track user's story history
CREATE TABLE IF NOT EXISTS story_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
  scenario_id TEXT NOT NULL,
  boss_name TEXT NOT NULL,
  story_title TEXT NOT NULL,
  generated_story TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies for characters
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own characters" ON characters
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own characters" ON characters
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own characters" ON characters
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own characters" ON characters
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for story generations
ALTER TABLE story_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own story generations" ON story_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own story generations" ON story_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own story generations" ON story_generations
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS characters_user_id_idx ON characters(user_id);
CREATE INDEX IF NOT EXISTS story_generations_user_id_idx ON story_generations(user_id);
CREATE INDEX IF NOT EXISTS story_generations_character_id_idx ON story_generations(character_id);
CREATE INDEX IF NOT EXISTS story_generations_created_at_idx ON story_generations(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for characters table
CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column(); 
/*
  # Create catch records table

  1. New Tables
    - `catch_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `location_id` (uuid, foreign key to fishing_locations)
      - `species` (text, not null)
      - `length` (real, length in inches)
      - `weight` (real, weight in pounds)
      - `photos` (text[], array of photo URLs)
      - `fly_pattern` (text, not null)
      - `weather` (jsonb, weather conditions)
      - `water_condition` (jsonb, water conditions at time of catch)
      - `notes` (text)
      - `is_released` (boolean, default true)
      - `timestamp` (timestamp, when caught)
      - `coordinates` (jsonb, lat/lng coordinates)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `catch_records` table
    - Add policy for users to read their own catches
    - Add policy for public read access to released catches
    - Add policy for users to create/update their own catches
*/

CREATE TABLE IF NOT EXISTS catch_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_id uuid NOT NULL REFERENCES fishing_locations(id) ON DELETE CASCADE,
  species text NOT NULL,
  length real CHECK (length > 0),
  weight real CHECK (weight > 0),
  photos text[] DEFAULT '{}',
  fly_pattern text NOT NULL,
  weather jsonb DEFAULT '{}',
  water_condition jsonb DEFAULT '{}',
  notes text DEFAULT '',
  is_released boolean DEFAULT true,
  timestamp timestamptz DEFAULT now(),
  coordinates jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE catch_records ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own catches
CREATE POLICY "Users can read own catches"
  ON catch_records
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow public read access to released catches (for community features)
CREATE POLICY "Public read access to released catches"
  ON catch_records
  FOR SELECT
  TO public
  USING (is_released = true);

-- Allow users to insert their own catches
CREATE POLICY "Users can create own catches"
  ON catch_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own catches
CREATE POLICY "Users can update own catches"
  ON catch_records
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own catches
CREATE POLICY "Users can delete own catches"
  ON catch_records
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_catch_records_user_id ON catch_records(user_id);
CREATE INDEX IF NOT EXISTS idx_catch_records_location_id ON catch_records(location_id);
CREATE INDEX IF NOT EXISTS idx_catch_records_species ON catch_records(species);
CREATE INDEX IF NOT EXISTS idx_catch_records_timestamp ON catch_records(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_catch_records_is_released ON catch_records(is_released);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_catch_records_updated_at
  BEFORE UPDATE ON catch_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update user's total catches count
CREATE OR REPLACE FUNCTION update_user_catch_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET total_catches = total_catches + 1 
    WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users 
    SET total_catches = GREATEST(total_catches - 1, 0) 
    WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically update user's catch count
CREATE TRIGGER update_user_catch_count_trigger
  AFTER INSERT OR DELETE ON catch_records
  FOR EACH ROW
  EXECUTE FUNCTION update_user_catch_count();
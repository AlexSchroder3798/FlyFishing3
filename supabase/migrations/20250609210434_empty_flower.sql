/*
  # Create fishing locations table

  1. New Tables
    - `fishing_locations`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `latitude` (real, not null)
      - `longitude` (real, not null)
      - `type` (text, not null) - river, lake, stream, pond
      - `difficulty` (text, not null) - beginner, intermediate, advanced
      - `species` (text[], array of species names)
      - `access` (text, not null) - public, private, guided
      - `regulations` (text, not null)
      - `rating` (real, default 0)
      - `review_count` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `fishing_locations` table
    - Add policy for public read access
    - Add policy for authenticated users to create/update locations
*/

CREATE TABLE IF NOT EXISTS fishing_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  latitude real NOT NULL,
  longitude real NOT NULL,
  type text NOT NULL CHECK (type IN ('river', 'lake', 'stream', 'pond')),
  difficulty text NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  species text[] DEFAULT '{}',
  access text NOT NULL CHECK (access IN ('public', 'private', 'guided')),
  regulations text NOT NULL DEFAULT '',
  rating real DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0 CHECK (review_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE fishing_locations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to fishing locations
CREATE POLICY "Public read access for fishing locations"
  ON fishing_locations
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert new locations
CREATE POLICY "Authenticated users can create locations"
  ON fishing_locations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update locations
CREATE POLICY "Authenticated users can update locations"
  ON fishing_locations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fishing_locations_type ON fishing_locations(type);
CREATE INDEX IF NOT EXISTS idx_fishing_locations_difficulty ON fishing_locations(difficulty);
CREATE INDEX IF NOT EXISTS idx_fishing_locations_access ON fishing_locations(access);
CREATE INDEX IF NOT EXISTS idx_fishing_locations_rating ON fishing_locations(rating DESC);
CREATE INDEX IF NOT EXISTS idx_fishing_locations_coordinates ON fishing_locations(latitude, longitude);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_fishing_locations_updated_at
  BEFORE UPDATE ON fishing_locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
/*
  # Create water conditions table

  1. New Tables
    - `water_conditions`
      - `id` (uuid, primary key)
      - `location_id` (uuid, foreign key to fishing_locations)
      - `temperature` (integer, water temperature in Fahrenheit)
      - `clarity` (text) - clear, slightly_stained, stained, muddy
      - `flow` (text) - low, normal, high, flood
      - `level` (real, water level in feet)
      - `last_updated` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `water_conditions` table
    - Add policy for public read access
    - Add policy for authenticated users to create/update conditions
*/

CREATE TABLE IF NOT EXISTS water_conditions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES fishing_locations(id) ON DELETE CASCADE,
  temperature integer NOT NULL CHECK (temperature >= 32 AND temperature <= 100),
  clarity text NOT NULL CHECK (clarity IN ('clear', 'slightly_stained', 'stained', 'muddy')),
  flow text NOT NULL CHECK (flow IN ('low', 'normal', 'high', 'flood')),
  level real NOT NULL DEFAULT 0 CHECK (level >= 0),
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE water_conditions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to water conditions
CREATE POLICY "Public read access for water conditions"
  ON water_conditions
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert new conditions
CREATE POLICY "Authenticated users can create water conditions"
  ON water_conditions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update conditions
CREATE POLICY "Authenticated users can update water conditions"
  ON water_conditions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_water_conditions_location_id ON water_conditions(location_id);
CREATE INDEX IF NOT EXISTS idx_water_conditions_last_updated ON water_conditions(last_updated DESC);
CREATE INDEX IF NOT EXISTS idx_water_conditions_clarity ON water_conditions(clarity);
CREATE INDEX IF NOT EXISTS idx_water_conditions_flow ON water_conditions(flow);

-- Create trigger to automatically update last_updated
CREATE TRIGGER update_water_conditions_last_updated
  BEFORE UPDATE ON water_conditions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
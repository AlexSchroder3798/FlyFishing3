/*
  # Create hatch events table

  1. New Tables
    - `hatch_events`
      - `id` (uuid, primary key)
      - `insect` (text, not null)
      - `region` (text, not null)
      - `start_date` (date, not null)
      - `end_date` (date, not null)
      - `peak_time` (text, not null)
      - `recommended_flies` (text array)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `hatch_events` table
    - Add policy for public read access
    - Add policy for authenticated users to create/update

  3. Triggers
    - Auto-update `updated_at` timestamp on changes
*/

CREATE TABLE IF NOT EXISTS hatch_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  insect text NOT NULL,
  region text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  peak_time text NOT NULL,
  recommended_flies text[] DEFAULT '{}',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hatch_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for hatch events"
  ON hatch_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create hatch events"
  ON hatch_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hatch events"
  ON hatch_events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_hatch_events_updated_at
  BEFORE UPDATE ON hatch_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO hatch_events (insect, region, start_date, end_date, peak_time, recommended_flies, notes) VALUES
  ('Blue Winged Olive', 'Southwestern Montana', '2024-04-15', '2024-05-30', 'Late afternoon', ARRAY['BWO Parachute #18', 'Pheasant Tail #16'], 'Best during overcast conditions'),
  ('Pale Morning Dun', 'Madison River Valley', '2024-06-01', '2024-07-15', 'Mid-morning', ARRAY['PMD Sparkle Dun #16', 'PMD Nymph #18'], 'Peak activity during warm, sunny mornings'),
  ('Caddis Hatch', 'Yellowstone Region', '2024-05-15', '2024-08-31', 'Evening', ARRAY['Elk Hair Caddis #14', 'Caddis Emerger #16'], 'Strong evening emergence, fish rising aggressively'),
  ('Trico Spinner Fall', 'Spring Creeks', '2024-07-01', '2024-09-15', 'Early morning', ARRAY['Trico Spinner #20', 'Trico Dun #22'], 'Massive spinner falls on calm mornings');
/*
  # Create guides table

  1. New Tables
    - `guides`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `location` (text, not null)
      - `rating` (real, 0-5 scale)
      - `specialties` (text array)
      - `price_range` (text)
      - `contact` (text)
      - `verified` (boolean)
      - `bio` (text)
      - `photos` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `guides` table
    - Add policy for public read access
    - Add policy for authenticated users to create/update

  3. Constraints
    - Rating must be between 0 and 5
    - Name and location are required

  4. Triggers
    - Auto-update `updated_at` timestamp on changes
*/

CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating real DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  specialties text[] DEFAULT '{}',
  price_range text DEFAULT '',
  contact text DEFAULT '',
  verified boolean DEFAULT false,
  bio text DEFAULT '',
  photos text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for guides"
  ON guides
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create guides"
  ON guides
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update guides"
  ON guides
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO guides (name, location, rating, specialties, price_range, contact, verified, bio, photos) VALUES
  ('Jake Morrison', 'Bozeman, MT', 4.9, ARRAY['Brown Trout', 'Rainbow Trout', 'Dry Fly Fishing'], '$400-500/day', 'jake.morrison@flyguide.com', true, 'Professional fly fishing guide with 15+ years experience on Montana rivers. Specializes in technical dry fly fishing and reading water. USCG licensed and insured.', ARRAY['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg']),
  ('Sarah Chen', 'Missoula, MT', 4.8, ARRAY['Nymph Fishing', 'Streamer Fishing', 'Beginner Instruction'], '$350-450/day', 'sarah@montanaflies.com', true, 'Specializing in technical nymph fishing and helping beginners build confidence. Former competitive angler with a passion for conservation and education.', ARRAY['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg']),
  ('Mike Rodriguez', 'Ennis, MT', 4.7, ARRAY['Madison River', 'Spring Creeks', 'Advanced Techniques'], '$450-550/day', 'mike@madisonguides.com', true, 'Third-generation Montana guide with intimate knowledge of the Madison River system. Expert in spring creek fishing and advanced casting techniques.', ARRAY['https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg']),
  ('Emma Thompson', 'Big Sky, MT', 4.6, ARRAY['Gallatin River', 'Backcountry', 'Photography'], '$375-475/day', 'emma@bigskyflies.com', false, 'Adventure guide combining fly fishing with wilderness photography. Specializes in backcountry trips and capturing the perfect fishing moment.', ARRAY['https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg']);
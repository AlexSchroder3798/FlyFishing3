/*
  # Create fishing reports and comments tables

  1. New Tables
    - `fishing_reports`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `location_id` (uuid, foreign key to fishing_locations)
      - `title` (text, not null)
      - `description` (text, not null)
      - `conditions` (text)
      - `success` (integer, 1-5 scale)
      - `timestamp` (timestamp)
      - `photos` (text[], array of photo URLs)
      - `likes` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `comments`
      - `id` (uuid, primary key)
      - `report_id` (uuid, foreign key to fishing_reports)
      - `user_id` (uuid, foreign key to users)
      - `content` (text, not null)
      - `timestamp` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create/update their own content
*/

CREATE TABLE IF NOT EXISTS fishing_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location_id uuid NOT NULL REFERENCES fishing_locations(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  conditions text DEFAULT '',
  success integer DEFAULT 1 CHECK (success >= 1 AND success <= 5),
  timestamp timestamptz DEFAULT now(),
  photos text[] DEFAULT '{}',
  likes integer DEFAULT 0 CHECK (likes >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES fishing_reports(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE fishing_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Fishing Reports Policies
CREATE POLICY "Public read access for fishing reports"
  ON fishing_reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create own reports"
  ON fishing_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON fishing_reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON fishing_reports
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Comments Policies
CREATE POLICY "Public read access for comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fishing_reports_user_id ON fishing_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_fishing_reports_location_id ON fishing_reports(location_id);
CREATE INDEX IF NOT EXISTS idx_fishing_reports_timestamp ON fishing_reports(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_fishing_reports_success ON fishing_reports(success DESC);
CREATE INDEX IF NOT EXISTS idx_fishing_reports_likes ON fishing_reports(likes DESC);

CREATE INDEX IF NOT EXISTS idx_comments_report_id ON comments(report_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_timestamp ON comments(timestamp DESC);

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_fishing_reports_updated_at
  BEFORE UPDATE ON fishing_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
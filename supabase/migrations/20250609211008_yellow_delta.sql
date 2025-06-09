-- Insert sample fishing locations
INSERT INTO fishing_locations (name, latitude, longitude, type, difficulty, species, access, regulations, rating, review_count) VALUES
('Ruby River', 45.3311, -112.5362, 'river', 'intermediate', ARRAY['Brown Trout', 'Rainbow Trout'], 'public', 'Artificial flies only, catch and release', 4.5, 127),
('Madison River', 44.6472, -111.1045, 'river', 'advanced', ARRAY['Brown Trout', 'Rainbow Trout', 'Mountain Whitefish'], 'public', 'Standard regulations apply', 4.8, 203),
('Yellowstone River', 45.7833, -110.6833, 'river', 'intermediate', ARRAY['Brown Trout', 'Rainbow Trout', 'Cutthroat Trout'], 'public', 'Check special regulations', 4.6, 156),
('Big Hole River', 45.6167, -113.4667, 'river', 'advanced', ARRAY['Brown Trout', 'Rainbow Trout', 'Grayling'], 'public', 'Hoot owl restrictions in summer', 4.7, 89),
('Beaverhead River', 45.1833, -112.8333, 'river', 'beginner', ARRAY['Brown Trout', 'Rainbow Trout'], 'public', 'Standard regulations', 4.2, 67);

-- Insert sample water conditions for the locations
INSERT INTO water_conditions (location_id, temperature, clarity, flow, level) 
SELECT 
  id,
  CASE 
    WHEN name = 'Ruby River' THEN 52
    WHEN name = 'Madison River' THEN 48
    WHEN name = 'Yellowstone River' THEN 55
    WHEN name = 'Big Hole River' THEN 46
    WHEN name = 'Beaverhead River' THEN 58
  END,
  CASE 
    WHEN name = 'Ruby River' THEN 'clear'
    WHEN name = 'Madison River' THEN 'slightly_stained'
    WHEN name = 'Yellowstone River' THEN 'clear'
    WHEN name = 'Big Hole River' THEN 'stained'
    WHEN name = 'Beaverhead River' THEN 'clear'
  END,
  CASE 
    WHEN name = 'Ruby River' THEN 'normal'
    WHEN name = 'Madison River' THEN 'high'
    WHEN name = 'Yellowstone River' THEN 'normal'
    WHEN name = 'Big Hole River' THEN 'low'
    WHEN name = 'Beaverhead River' THEN 'normal'
  END,
  CASE 
    WHEN name = 'Ruby River' THEN 3.2
    WHEN name = 'Madison River' THEN 4.1
    WHEN name = 'Yellowstone River' THEN 2.8
    WHEN name = 'Big Hole River' THEN 1.9
    WHEN name = 'Beaverhead River' THEN 3.5
  END
FROM fishing_locations;
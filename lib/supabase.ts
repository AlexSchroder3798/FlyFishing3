import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types based on our schema
export interface Database {
  public: {
    Tables: {
      fishing_locations: {
        Row: {
          id: string;
          name: string;
          latitude: number;
          longitude: number;
          type: 'river' | 'lake' | 'stream' | 'pond';
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          species: string[];
          access: 'public' | 'private' | 'guided';
          regulations: string;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          latitude: number;
          longitude: number;
          type: 'river' | 'lake' | 'stream' | 'pond';
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          species?: string[];
          access: 'public' | 'private' | 'guided';
          regulations?: string;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          latitude?: number;
          longitude?: number;
          type?: 'river' | 'lake' | 'stream' | 'pond';
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          species?: string[];
          access?: 'public' | 'private' | 'guided';
          regulations?: string;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      water_conditions: {
        Row: {
          id: string;
          location_id: string;
          temperature: number;
          clarity: 'clear' | 'slightly_stained' | 'stained' | 'muddy';
          flow: 'low' | 'normal' | 'high' | 'flood';
          level: number;
          last_updated: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          location_id: string;
          temperature: number;
          clarity: 'clear' | 'slightly_stained' | 'stained' | 'muddy';
          flow: 'low' | 'normal' | 'high' | 'flood';
          level?: number;
          last_updated?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          location_id?: string;
          temperature?: number;
          clarity?: 'clear' | 'slightly_stained' | 'stained' | 'muddy';
          flow?: 'low' | 'normal' | 'high' | 'flood';
          level?: number;
          last_updated?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string | null;
          email: string | null;
          avatar: string | null;
          location: string | null;
          experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          total_catches: number;
          favorite_species: string[];
          join_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          email?: string | null;
          avatar?: string | null;
          location?: string | null;
          experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          total_catches?: number;
          favorite_species?: string[];
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          email?: string | null;
          avatar?: string | null;
          location?: string | null;
          experience?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
          total_catches?: number;
          favorite_species?: string[];
          join_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      catch_records: {
        Row: {
          id: string;
          user_id: string;
          location_id: string;
          species: string;
          length: number | null;
          weight: number | null;
          photos: string[];
          fly_pattern: string;
          weather: any;
          water_condition: any;
          notes: string;
          is_released: boolean;
          timestamp: string;
          coordinates: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          location_id: string;
          species: string;
          length?: number | null;
          weight?: number | null;
          photos?: string[];
          fly_pattern: string;
          weather?: any;
          water_condition?: any;
          notes?: string;
          is_released?: boolean;
          timestamp?: string;
          coordinates?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          location_id?: string;
          species?: string;
          length?: number | null;
          weight?: number | null;
          photos?: string[];
          fly_pattern?: string;
          weather?: any;
          water_condition?: any;
          notes?: string;
          is_released?: boolean;
          timestamp?: string;
          coordinates?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      fishing_reports: {
        Row: {
          id: string;
          user_id: string;
          location_id: string;
          title: string;
          description: string;
          conditions: string;
          success: number;
          timestamp: string;
          photos: string[];
          likes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          location_id: string;
          title: string;
          description: string;
          conditions?: string;
          success?: number;
          timestamp?: string;
          photos?: string[];
          likes?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          location_id?: string;
          title?: string;
          description?: string;
          conditions?: string;
          success?: number;
          timestamp?: string;
          photos?: string[];
          likes?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          report_id: string;
          user_id: string;
          content: string;
          timestamp: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          user_id: string;
          content: string;
          timestamp?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          report_id?: string;
          user_id?: string;
          content?: string;
          timestamp?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      hatch_events: {
        Row: {
          id: string;
          insect: string;
          region: string;
          start_date: string;
          end_date: string;
          peak_time: string;
          recommended_flies: string[];
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          insect: string;
          region: string;
          start_date: string;
          end_date: string;
          peak_time: string;
          recommended_flies?: string[];
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          insect?: string;
          region?: string;
          start_date?: string;
          end_date?: string;
          peak_time?: string;
          recommended_flies?: string[];
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      guides: {
        Row: {
          id: string;
          name: string;
          location: string;
          rating: number;
          specialties: string[];
          price_range: string;
          contact: string;
          verified: boolean;
          bio: string;
          photos: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          rating?: number;
          specialties?: string[];
          price_range?: string;
          contact?: string;
          verified?: boolean;
          bio?: string;
          photos?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          rating?: number;
          specialties?: string[];
          price_range?: string;
          contact?: string;
          verified?: boolean;
          bio?: string;
          photos?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
import { supabase } from './supabase';
import { FishingLocation, WaterCondition, CatchRecord, FishingReport, Comment, User, HatchEvent } from '@/types';

/**
 * Database service layer for handling all Supabase operations
 * Provides a clean interface between the UI and database
 */

// ============================================================================
// FISHING LOCATIONS
// ============================================================================

export async function getFishingLocations(): Promise<FishingLocation[]> {
  try {
    const { data, error } = await supabase
      .from('fishing_locations')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching fishing locations:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching fishing locations:', error);
    return [];
  }
}

export async function getFishingLocationById(id: string): Promise<FishingLocation | null> {
  try {
    const { data, error } = await supabase
      .from('fishing_locations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching fishing location:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching fishing location:', error);
    return null;
  }
}

export async function createFishingLocation(location: Omit<FishingLocation, 'id' | 'created_at' | 'updated_at'>): Promise<FishingLocation | null> {
  try {
    const { data, error } = await supabase
      .from('fishing_locations')
      .insert([location])
      .select()
      .single();

    if (error) {
      console.error('Error creating fishing location:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating fishing location:', error);
    return null;
  }
}

// ============================================================================
// WATER CONDITIONS
// ============================================================================

export async function getWaterConditions(): Promise<WaterCondition[]> {
  try {
    const { data, error } = await supabase
      .from('water_conditions')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error) {
      console.error('Error fetching water conditions:', error);
      return [];
    }

    return (data || []).map(condition => ({
      ...condition,
      lastUpdated: new Date(condition.last_updated)
    }));
  } catch (error) {
    console.error('Unexpected error fetching water conditions:', error);
    return [];
  }
}

export async function getWaterConditionsByLocationId(locationId: string): Promise<WaterCondition | null> {
  try {
    const { data, error } = await supabase
      .from('water_conditions')
      .select('*')
      .eq('location_id', locationId)
      .order('last_updated', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching water condition:', error);
      return null;
    }

    return {
      ...data,
      lastUpdated: new Date(data.last_updated)
    };
  } catch (error) {
    console.error('Unexpected error fetching water condition:', error);
    return null;
  }
}

export async function createWaterCondition(condition: Omit<WaterCondition, 'id' | 'created_at' | 'lastUpdated'>): Promise<WaterCondition | null> {
  try {
    const { data, error } = await supabase
      .from('water_conditions')
      .insert([{
        ...condition,
        last_updated: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating water condition:', error);
      return null;
    }

    return {
      ...data,
      lastUpdated: new Date(data.last_updated)
    };
  } catch (error) {
    console.error('Unexpected error creating water condition:', error);
    return null;
  }
}

// ============================================================================
// CATCH RECORDS
// ============================================================================

export async function getCatchRecords(userId?: string): Promise<CatchRecord[]> {
  try {
    let query = supabase
      .from('catch_records')
      .select('*')
      .order('timestamp', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching catch records:', error);
      return [];
    }

    return (data || []).map(record => ({
      ...record,
      timestamp: new Date(record.timestamp),
      weather: record.weather || {},
      waterCondition: record.water_condition || {},
      coordinates: record.coordinates || {}
    }));
  } catch (error) {
    console.error('Unexpected error fetching catch records:', error);
    return [];
  }
}

export async function createCatchRecord(record: Omit<CatchRecord, 'id' | 'created_at' | 'updated_at'>): Promise<CatchRecord | null> {
  try {
    const { data, error } = await supabase
      .from('catch_records')
      .insert([{
        ...record,
        water_condition: record.waterCondition,
        timestamp: record.timestamp.toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating catch record:', error);
      return null;
    }

    return {
      ...data,
      timestamp: new Date(data.timestamp),
      weather: data.weather || {},
      waterCondition: data.water_condition || {},
      coordinates: data.coordinates || {}
    };
  } catch (error) {
    console.error('Unexpected error creating catch record:', error);
    return null;
  }
}

// ============================================================================
// FISHING REPORTS
// ============================================================================

export async function getFishingReports(): Promise<FishingReport[]> {
  try {
    const { data, error } = await supabase
      .from('fishing_reports')
      .select(`
        *,
        comments (
          id,
          user_id,
          content,
          timestamp,
          users (username)
        )
      `)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching fishing reports:', error);
      return [];
    }

    return (data || []).map(report => ({
      ...report,
      timestamp: new Date(report.timestamp),
      comments: (report.comments || []).map((comment: any) => ({
        id: comment.id,
        userId: comment.user_id,
        username: comment.users?.username || 'Anonymous',
        content: comment.content,
        timestamp: new Date(comment.timestamp)
      }))
    }));
  } catch (error) {
    console.error('Unexpected error fetching fishing reports:', error);
    return [];
  }
}

export async function createFishingReport(report: Omit<FishingReport, 'id' | 'created_at' | 'updated_at' | 'comments' | 'likes'>): Promise<FishingReport | null> {
  try {
    const { data, error } = await supabase
      .from('fishing_reports')
      .insert([{
        ...report,
        timestamp: report.timestamp.toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating fishing report:', error);
      return null;
    }

    return {
      ...data,
      timestamp: new Date(data.timestamp),
      comments: []
    };
  } catch (error) {
    console.error('Unexpected error creating fishing report:', error);
    return null;
  }
}

// ============================================================================
// USERS
// ============================================================================

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return {
      ...data,
      joinDate: new Date(data.join_date)
    };
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return {
      ...data,
      joinDate: new Date(data.join_date)
    };
  } catch (error) {
    console.error('Unexpected error updating user profile:', error);
    return null;
  }
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

export async function signUp(email: string, password: string, username?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split('@')[0]
        }
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Unexpected error during sign up:', error);
    return { user: null, error };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Unexpected error during sign in:', error);
    return { user: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      return { error };
    }

    return { error: null };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error };
  }
}

// ============================================================================
// MOCK DATA FUNCTIONS (for features not yet in database)
// ============================================================================

export function getMockHatchEvents(): HatchEvent[] {
  return [
    {
      id: '1',
      insect: 'Blue Winged Olive',
      region: 'Southwestern Montana',
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-05-30'),
      peakTime: 'Late afternoon',
      recommendedFlies: ['BWO Parachute #18', 'Pheasant Tail #16'],
      notes: 'Best during overcast conditions'
    },
    {
      id: '2',
      insect: 'Pale Morning Dun',
      region: 'Madison River Valley',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-15'),
      peakTime: 'Mid-morning',
      recommendedFlies: ['PMD Sparkle Dun #16', 'PMD Nymph #18'],
      notes: 'Peak activity during warm, sunny mornings'
    }
  ];
}

export function getMockGuides() {
  return [
    {
      id: '1',
      name: 'Jake Morrison',
      location: 'Bozeman, MT',
      rating: 4.9,
      specialties: ['Brown Trout', 'Rainbow Trout', 'Dry Fly Fishing'],
      priceRange: '$400-500/day',
      contact: 'jake.morrison@flyguide.com',
      verified: true,
      bio: 'Professional fly fishing guide with 15+ years experience on Montana rivers.',
      photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      location: 'Missoula, MT',
      rating: 4.8,
      specialties: ['Nymph Fishing', 'Streamer Fishing', 'Beginner Instruction'],
      priceRange: '$350-450/day',
      contact: 'sarah@montanaflies.com',
      verified: true,
      bio: 'Specializing in technical nymph fishing and helping beginners build confidence.',
      photos: ['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg']
    }
  ];
}
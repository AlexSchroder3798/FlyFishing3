import { supabase } from './supabase';
import { FishingLocation, WaterCondition, HatchEvent, CatchRecord, FishingReport, Guide, User, Comment } from '@/types';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

/**
 * Database service layer for Supabase operations
 * Provides type-safe functions to interact with the fishing app database
 */

// Complete the auth session for web browser
WebBrowser.maybeCompleteAuthSession();

// Fishing Locations
export async function getFishingLocations(): Promise<FishingLocation[]> {
  try {
    const { data, error } = await supabase
      .from('fishing_locations')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching fishing locations:', error);
      throw new Error('Failed to fetch fishing locations');
    }

    return data.map(location => ({
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      type: location.type,
      difficulty: location.difficulty,
      species: location.species || [],
      access: location.access,
      regulations: location.regulations,
      rating: location.rating,
      reviewCount: location.review_count
    }));
  } catch (error) {
    console.error('Database error in getFishingLocations:', error);
    throw error;
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
      if (error.code === 'PGRST116') {
        return null; // No rows found
      }
      console.error('Error fetching fishing location:', error);
      throw new Error('Failed to fetch fishing location');
    }

    return {
      id: data.id,
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      type: data.type,
      difficulty: data.difficulty,
      species: data.species || [],
      access: data.access,
      regulations: data.regulations,
      rating: data.rating,
      reviewCount: data.review_count
    };
  } catch (error) {
    console.error('Database error in getFishingLocationById:', error);
    throw error;
  }
}

// Water Conditions
export async function getWaterConditions(): Promise<WaterCondition[]> {
  try {
    const { data, error } = await supabase
      .from('water_conditions')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error) {
      console.error('Error fetching water conditions:', error);
      throw new Error('Failed to fetch water conditions');
    }

    return data.map(condition => ({
      locationId: condition.location_id,
      temperature: condition.temperature,
      clarity: condition.clarity,
      flow: condition.flow,
      level: condition.level,
      lastUpdated: new Date(condition.last_updated)
    }));
  } catch (error) {
    console.error('Database error in getWaterConditions:', error);
    throw error;
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
      if (error.code === 'PGRST116') {
        return null; // No rows found
      }
      console.error('Error fetching water condition:', error);
      throw new Error('Failed to fetch water condition');
    }

    return {
      locationId: data.location_id,
      temperature: data.temperature,
      clarity: data.clarity,
      flow: data.flow,
      level: data.level,
      lastUpdated: new Date(data.last_updated)
    };
  } catch (error) {
    console.error('Database error in getWaterConditionsByLocationId:', error);
    throw error;
  }
}

// Hatch Events
export async function getHatchEvents(): Promise<HatchEvent[]> {
  try {
    const { data, error } = await supabase
      .from('hatch_events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching hatch events:', error);
      throw new Error('Failed to fetch hatch events');
    }

    return data.map(hatch => ({
      id: hatch.id,
      insect: hatch.insect,
      region: hatch.region,
      startDate: new Date(hatch.start_date),
      endDate: new Date(hatch.end_date),
      peakTime: hatch.peak_time,
      recommendedFlies: hatch.recommended_flies || [],
      notes: hatch.notes
    }));
  } catch (error) {
    console.error('Database error in getHatchEvents:', error);
    throw error;
  }
}

export async function getActiveHatchEvents(): Promise<HatchEvent[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('hatch_events')
      .select('*')
      .lte('start_date', today)
      .gte('end_date', today)
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching active hatch events:', error);
      throw new Error('Failed to fetch active hatch events');
    }

    return data.map(hatch => ({
      id: hatch.id,
      insect: hatch.insect,
      region: hatch.region,
      startDate: new Date(hatch.start_date),
      endDate: new Date(hatch.end_date),
      peakTime: hatch.peak_time,
      recommendedFlies: hatch.recommended_flies || [],
      notes: hatch.notes
    }));
  } catch (error) {
    console.error('Database error in getActiveHatchEvents:', error);
    throw error;
  }
}

// Catch Records
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
      throw new Error('Failed to fetch catch records');
    }

    return data.map(record => ({
      id: record.id,
      userId: record.user_id,
      locationId: record.location_id,
      species: record.species,
      length: record.length,
      weight: record.weight,
      photos: record.photos || [],
      flyPattern: record.fly_pattern,
      weather: record.weather || {},
      waterCondition: record.water_condition || {},
      notes: record.notes,
      isReleased: record.is_released,
      timestamp: new Date(record.timestamp),
      coordinates: record.coordinates
    }));
  } catch (error) {
    console.error('Database error in getCatchRecords:', error);
    throw error;
  }
}

export async function createCatchRecord(catchRecord: Omit<CatchRecord, 'id'>): Promise<CatchRecord> {
  try {
    const { data, error } = await supabase
      .from('catch_records')
      .insert({
        user_id: catchRecord.userId,
        location_id: catchRecord.locationId,
        species: catchRecord.species,
        length: catchRecord.length,
        weight: catchRecord.weight,
        photos: catchRecord.photos,
        fly_pattern: catchRecord.flyPattern,
        weather: catchRecord.weather,
        water_condition: catchRecord.waterCondition,
        notes: catchRecord.notes,
        is_released: catchRecord.isReleased,
        timestamp: catchRecord.timestamp.toISOString(),
        coordinates: catchRecord.coordinates
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating catch record:', error);
      throw new Error('Failed to create catch record');
    }

    return {
      id: data.id,
      userId: data.user_id,
      locationId: data.location_id,
      species: data.species,
      length: data.length,
      weight: data.weight,
      photos: data.photos || [],
      flyPattern: data.fly_pattern,
      weather: data.weather || {},
      waterCondition: data.water_condition || {},
      notes: data.notes,
      isReleased: data.is_released,
      timestamp: new Date(data.timestamp),
      coordinates: data.coordinates
    };
  } catch (error) {
    console.error('Database error in createCatchRecord:', error);
    throw error;
  }
}

// Fishing Reports
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
      throw new Error('Failed to fetch fishing reports');
    }

    return data.map(report => ({
      id: report.id,
      userId: report.user_id,
      locationId: report.location_id,
      title: report.title,
      description: report.description,
      conditions: report.conditions,
      success: report.success,
      timestamp: new Date(report.timestamp),
      photos: report.photos || [],
      likes: report.likes,
      comments: (report.comments || []).map((comment: any) => ({
        id: comment.id,
        userId: comment.user_id,
        username: comment.users?.username || 'Anonymous',
        content: comment.content,
        timestamp: new Date(comment.timestamp)
      }))
    }));
  } catch (error) {
    console.error('Database error in getFishingReports:', error);
    throw error;
  }
}

export async function createFishingReport(report: Omit<FishingReport, 'id' | 'likes' | 'comments'>): Promise<FishingReport> {
  try {
    const { data, error } = await supabase
      .from('fishing_reports')
      .insert({
        user_id: report.userId,
        location_id: report.locationId,
        title: report.title,
        description: report.description,
        conditions: report.conditions,
        success: report.success,
        timestamp: report.timestamp.toISOString(),
        photos: report.photos
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating fishing report:', error);
      throw new Error('Failed to create fishing report');
    }

    return {
      id: data.id,
      userId: data.user_id,
      locationId: data.location_id,
      title: data.title,
      description: data.description,
      conditions: data.conditions,
      success: data.success,
      timestamp: new Date(data.timestamp),
      photos: data.photos || [],
      likes: data.likes,
      comments: []
    };
  } catch (error) {
    console.error('Database error in createFishingReport:', error);
    throw error;
  }
}

// Guides
export async function getGuides(): Promise<Guide[]> {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching guides:', error);
      throw new Error('Failed to fetch guides');
    }

    return data.map(guide => ({
      id: guide.id,
      name: guide.name,
      location: guide.location,
      rating: guide.rating,
      specialties: guide.specialties || [],
      priceRange: guide.price_range,
      contact: guide.contact,
      verified: guide.verified,
      bio: guide.bio,
      photos: guide.photos || []
    }));
  } catch (error) {
    console.error('Database error in getGuides:', error);
    throw error;
  }
}

export async function getVerifiedGuides(): Promise<Guide[]> {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('verified', true)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching verified guides:', error);
      throw new Error('Failed to fetch verified guides');
    }

    return data.map(guide => ({
      id: guide.id,
      name: guide.name,
      location: guide.location,
      rating: guide.rating,
      specialties: guide.specialties || [],
      priceRange: guide.price_range,
      contact: guide.contact,
      verified: guide.verified,
      bio: guide.bio,
      photos: guide.photos || []
    }));
  } catch (error) {
    console.error('Database error in getVerifiedGuides:', error);
    throw error;
  }
}

// Users
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No user profile found
      }
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }

    return {
      id: data.id,
      username: data.username || '',
      email: data.email || '',
      avatar: data.avatar,
      location: data.location,
      experience: data.experience,
      totalCatches: data.total_catches,
      favoriteSpecies: data.favorite_species || [],
      joinDate: new Date(data.join_date)
    };
  } catch (error) {
    console.error('Database error in getCurrentUser:', error);
    throw error;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No user found
      }
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }

    return {
      id: data.id,
      username: data.username || '',
      email: data.email || '',
      avatar: data.avatar,
      location: data.location,
      experience: data.experience,
      totalCatches: data.total_catches,
      favoriteSpecies: data.favorite_species || [],
      joinDate: new Date(data.join_date)
    };
  } catch (error) {
    console.error('Database error in getUserById:', error);
    throw error;
  }
}

// Authentication helpers
export async function signUp(email: string, password: string, username: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (error) {
      console.error('Error signing up:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Auth error in signUp:', error);
    throw error;
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
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Auth error in signIn:', error);
    throw error;
  }
}

/**
 * Sign in with Google using OAuth
 * Handles both web and mobile platforms with appropriate redirect URIs
 */
export async function signInWithGoogle() {
  try {
    // Generate redirect URI based on platform
    const redirectUri = Platform.select({
      web: `${window.location.origin}/auth/callback`,
      default: makeRedirectUri({
        scheme: 'flymaster',
        path: 'auth/callback',
      }),
    });

    console.log('Google OAuth redirect URI:', redirectUri);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          // 🚩 Do NOT set "state" manually here!
        },
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      throw new Error(error.message);
    }

    // For web, the redirect will happen automatically
    // For mobile, we need to handle the browser session
    if (Platform.OS !== 'web' && data.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUri,
        {
          showInRecents: true,
        }
      );

      if (result.type === 'success') {
        // Parse the URL to extract the session
        const url = new URL(result.url);
        const accessToken = url.searchParams.get('access_token');
        const refreshToken = url.searchParams.get('refresh_token');

        if (accessToken) {
          // Set the session manually for mobile
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) {
            throw new Error(sessionError.message);
          }

          return sessionData;
        }
      } else if (result.type === 'cancel') {
        throw new Error('Authentication was cancelled');
      } else {
        throw new Error('Authentication failed');
      }
    }

    return data;
  } catch (error) {
    console.error('Auth error in signInWithGoogle:', error);
    throw error;
  }
}


/**
 * Sign in with Apple using OAuth
 * Available on iOS and web platforms
 */
export async function signInWithApple() {
  try {
    // Apple Sign-In is only available on iOS and web
    if (Platform.OS === 'android') {
      throw new Error('Apple Sign-In is not available on Android');
    }

    const state = Crypto.randomUUID();
    
    const redirectUri = Platform.select({
      web: `${window.location.origin}/auth/callback`,
      default: makeRedirectUri({
        scheme: 'flymaster',
        path: 'auth/callback'
      })
    });

    console.log('Apple OAuth redirect URI:', redirectUri);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectUri,
        queryParams: {
          state: state
        }
      }
    });

    if (error) {
      console.error('Error signing in with Apple:', error);
      throw new Error(error.message);
    }

    // Handle mobile browser session
    if (Platform.OS !== 'web' && data.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUri,
        {
          showInRecents: true,
        }
      );

      if (result.type === 'success') {
        const url = new URL(result.url);
        const accessToken = url.searchParams.get('access_token');
        const refreshToken = url.searchParams.get('refresh_token');
        
        if (accessToken) {
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          });

          if (sessionError) {
            throw new Error(sessionError.message);
          }

          return sessionData;
        }
      } else if (result.type === 'cancel') {
        throw new Error('Authentication was cancelled');
      } else {
        throw new Error('Authentication failed');
      }
    }

    return data;
  } catch (error) {
    console.error('Auth error in signInWithApple:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Auth error in signOut:', error);
    throw error;
  }
}

/**
 * Get the current authentication session
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      throw new Error(error.message);
    }

    return session;
  } catch (error) {
    console.error('Auth error in getSession:', error);
    throw error;
  }
}

/**
 * Listen to authentication state changes
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
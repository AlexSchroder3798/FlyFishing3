import { supabase } from './supabase';
import { FishingLocation, WaterCondition, CatchRecord, FishingReport, Comment, User, HatchEvent, Guide } from '@/types';

/**
 * Database service layer for handling all Supabase operations
 * Provides a clean interface between the UI and database
 * 
 * This service follows SOLID principles:
 * - Single Responsibility: Each function handles one specific database operation
 * - Open/Closed: Easy to extend with new functions without modifying existing ones
 * - Interface Segregation: Functions are focused and don't expose unnecessary complexity
 * - Dependency Inversion: UI components depend on this abstraction, not Supabase directly
 */

// ============================================================================
// FISHING LOCATIONS
// ============================================================================

/**
 * Retrieves all fishing locations ordered by rating
 * @returns Promise<FishingLocation[]> Array of fishing locations
 */
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

    return (data || []).map(location => ({
      ...location,
      reviewCount: location.review_count
    }));
  } catch (error) {
    console.error('Unexpected error fetching fishing locations:', error);
    return [];
  }
}

/**
 * Retrieves a specific fishing location by ID
 * @param id - The location ID
 * @returns Promise<FishingLocation | null> The fishing location or null if not found
 */
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

    return {
      ...data,
      reviewCount: data.review_count
    };
  } catch (error) {
    console.error('Unexpected error fetching fishing location:', error);
    return null;
  }
}

/**
 * Creates a new fishing location
 * @param location - The location data to create
 * @returns Promise<FishingLocation | null> The created location or null if failed
 */
export async function createFishingLocation(
  location: Omit<FishingLocation, 'id' | 'created_at' | 'updated_at'>
): Promise<FishingLocation | null> {
  try {
    const { data, error } = await supabase
      .from('fishing_locations')
      .insert([{
        ...location,
        review_count: location.reviewCount
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating fishing location:', error);
      return null;
    }

    return {
      ...data,
      reviewCount: data.review_count
    };
  } catch (error) {
    console.error('Unexpected error creating fishing location:', error);
    return null;
  }
}

// ============================================================================
// WATER CONDITIONS
// ============================================================================

/**
 * Retrieves all water conditions ordered by last updated
 * @returns Promise<WaterCondition[]> Array of water conditions
 */
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
      locationId: condition.location_id,
      lastUpdated: new Date(condition.last_updated)
    }));
  } catch (error) {
    console.error('Unexpected error fetching water conditions:', error);
    return [];
  }
}

/**
 * Retrieves water conditions for a specific location
 * @param locationId - The location ID
 * @returns Promise<WaterCondition | null> The water condition or null if not found
 */
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
      locationId: data.location_id,
      lastUpdated: new Date(data.last_updated)
    };
  } catch (error) {
    console.error('Unexpected error fetching water condition:', error);
    return null;
  }
}

/**
 * Creates a new water condition record
 * @param condition - The water condition data to create
 * @returns Promise<WaterCondition | null> The created condition or null if failed
 */
export async function createWaterCondition(
  condition: Omit<WaterCondition, 'id' | 'created_at' | 'lastUpdated'>
): Promise<WaterCondition | null> {
  try {
    const { data, error } = await supabase
      .from('water_conditions')
      .insert([{
        location_id: condition.locationId,
        temperature: condition.temperature,
        clarity: condition.clarity,
        flow: condition.flow,
        level: condition.level,
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
      locationId: data.location_id,
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

/**
 * Retrieves catch records, optionally filtered by user ID
 * @param userId - Optional user ID to filter by
 * @returns Promise<CatchRecord[]> Array of catch records
 */
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
      userId: record.user_id,
      locationId: record.location_id,
      flyPattern: record.fly_pattern,
      isReleased: record.is_released,
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

/**
 * Creates a new catch record
 * @param record - The catch record data to create
 * @returns Promise<CatchRecord | null> The created record or null if failed
 */
export async function createCatchRecord(
  record: Omit<CatchRecord, 'id' | 'created_at' | 'updated_at'>
): Promise<CatchRecord | null> {
  try {
    const { data, error } = await supabase
      .from('catch_records')
      .insert([{
        user_id: record.userId,
        location_id: record.locationId,
        species: record.species,
        length: record.length,
        weight: record.weight,
        photos: record.photos,
        fly_pattern: record.flyPattern,
        weather: record.weather,
        water_condition: record.waterCondition,
        notes: record.notes,
        is_released: record.isReleased,
        timestamp: record.timestamp.toISOString(),
        coordinates: record.coordinates
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating catch record:', error);
      return null;
    }

    return {
      ...data,
      userId: data.user_id,
      locationId: data.location_id,
      flyPattern: data.fly_pattern,
      isReleased: data.is_released,
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

/**
 * Retrieves all fishing reports with comments
 * @returns Promise<FishingReport[]> Array of fishing reports
 */
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
      userId: report.user_id,
      locationId: report.location_id,
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

/**
 * Creates a new fishing report
 * @param report - The fishing report data to create
 * @returns Promise<FishingReport | null> The created report or null if failed
 */
export async function createFishingReport(
  report: Omit<FishingReport, 'id' | 'created_at' | 'updated_at' | 'comments' | 'likes'>
): Promise<FishingReport | null> {
  try {
    const { data, error } = await supabase
      .from('fishing_reports')
      .insert([{
        user_id: report.userId,
        location_id: report.locationId,
        title: report.title,
        description: report.description,
        conditions: report.conditions,
        success: report.success,
        photos: report.photos,
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
      userId: data.user_id,
      locationId: data.location_id,
      timestamp: new Date(data.timestamp),
      comments: []
    };
  } catch (error) {
    console.error('Unexpected error creating fishing report:', error);
    return null;
  }
}

// ============================================================================
// COMMENTS
// ============================================================================

/**
 * Creates a new comment
 * @param comment - The comment data to create
 * @returns Promise<Comment | null> The created comment or null if failed
 */
export async function createComment(
  comment: Omit<Comment, 'id' | 'username'>
): Promise<Comment | null> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        report_id: comment.reportId,
        user_id: comment.userId,
        content: comment.content,
        timestamp: comment.timestamp.toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating comment:', error);
      return null;
    }

    // Fetch username for the created comment
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', data.user_id)
      .single();

    return {
      id: data.id,
      reportId: data.report_id,
      userId: data.user_id,
      content: data.content,
      timestamp: new Date(data.timestamp),
      username: userData?.username || 'Anonymous'
    };
  } catch (error) {
    console.error('Unexpected error creating comment:', error);
    return null;
  }
}

// ============================================================================
// HATCH EVENTS
// ============================================================================

/**
 * Retrieves all hatch events ordered by start date
 * @returns Promise<HatchEvent[]> Array of hatch events
 */
export async function getHatchEvents(): Promise<HatchEvent[]> {
  try {
    const { data, error } = await supabase
      .from('hatch_events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Error fetching hatch events:', error);
      return [];
    }

    return (data || []).map(event => ({
      ...event,
      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
      peakTime: event.peak_time,
      recommendedFlies: event.recommended_flies || []
    }));
  } catch (error) {
    console.error('Unexpected error fetching hatch events:', error);
    return [];
  }
}

/**
 * Retrieves currently active hatch events
 * @returns Promise<HatchEvent[]> Array of active hatch events
 */
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
      return [];
    }

    return (data || []).map(event => ({
      ...event,
      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
      peakTime: event.peak_time,
      recommendedFlies: event.recommended_flies || []
    }));
  } catch (error) {
    console.error('Unexpected error fetching active hatch events:', error);
    return [];
  }
}

/**
 * Creates a new hatch event
 * @param event - The hatch event data to create
 * @returns Promise<HatchEvent | null> The created event or null if failed
 */
export async function createHatchEvent(
  event: Omit<HatchEvent, 'id' | 'created_at' | 'updated_at'>
): Promise<HatchEvent | null> {
  try {
    const { data, error } = await supabase
      .from('hatch_events')
      .insert([{
        insect: event.insect,
        region: event.region,
        start_date: event.startDate.toISOString().split('T')[0],
        end_date: event.endDate.toISOString().split('T')[0],
        peak_time: event.peakTime,
        recommended_flies: event.recommendedFlies,
        notes: event.notes
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating hatch event:', error);
      return null;
    }

    return {
      ...data,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      peakTime: data.peak_time,
      recommendedFlies: data.recommended_flies || []
    };
  } catch (error) {
    console.error('Unexpected error creating hatch event:', error);
    return null;
  }
}

// ============================================================================
// GUIDES
// ============================================================================

/**
 * Retrieves all guides ordered by rating
 * @returns Promise<Guide[]> Array of guides
 */
export async function getGuides(): Promise<Guide[]> {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching guides:', error);
      return [];
    }

    return (data || []).map(guide => ({
      ...guide,
      priceRange: guide.price_range,
      specialties: guide.specialties || [],
      photos: guide.photos || []
    }));
  } catch (error) {
    console.error('Unexpected error fetching guides:', error);
    return [];
  }
}

/**
 * Retrieves only verified guides
 * @returns Promise<Guide[]> Array of verified guides
 */
export async function getVerifiedGuides(): Promise<Guide[]> {
  try {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('verified', true)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching verified guides:', error);
      return [];
    }

    return (data || []).map(guide => ({
      ...guide,
      priceRange: guide.price_range,
      specialties: guide.specialties || [],
      photos: guide.photos || []
    }));
  } catch (error) {
    console.error('Unexpected error fetching verified guides:', error);
    return [];
  }
}

/**
 * Creates a new guide profile
 * @param guide - The guide data to create
 * @returns Promise<Guide | null> The created guide or null if failed
 */
export async function createGuide(
  guide: Omit<Guide, 'id' | 'created_at' | 'updated_at'>
): Promise<Guide | null> {
  try {
    const { data, error } = await supabase
      .from('guides')
      .insert([{
        name: guide.name,
        location: guide.location,
        rating: guide.rating,
        specialties: guide.specialties,
        price_range: guide.priceRange,
        contact: guide.contact,
        verified: guide.verified,
        bio: guide.bio,
        photos: guide.photos
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating guide:', error);
      return null;
    }

    return {
      ...data,
      priceRange: data.price_range,
      specialties: data.specialties || [],
      photos: data.photos || []
    };
  } catch (error) {
    console.error('Unexpected error creating guide:', error);
    return null;
  }
}

// ============================================================================
// USERS
// ============================================================================

/**
 * Retrieves the current authenticated user's profile
 * @returns Promise<User | null> The user profile or null if not found
 */
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
      totalCatches: data.total_catches,
      favoriteSpecies: data.favorite_species || [],
      joinDate: new Date(data.join_date)
    };
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
}

/**
 * Updates a user's profile
 * @param userId - The user ID
 * @param updates - The profile updates
 * @returns Promise<User | null> The updated user or null if failed
 */
export async function updateUserProfile(
  userId: string, 
  updates: Partial<User>
): Promise<User | null> {
  try {
    const updateData: any = { ...updates };
    
    // Map field names to database column names
    if (updates.totalCatches !== undefined) {
      updateData.total_catches = updates.totalCatches;
      delete updateData.totalCatches;
    }
    if (updates.favoriteSpecies !== undefined) {
      updateData.favorite_species = updates.favoriteSpecies;
      delete updateData.favoriteSpecies;
    }
    if (updates.joinDate !== undefined) {
      updateData.join_date = updates.joinDate.toISOString();
      delete updateData.joinDate;
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return {
      ...data,
      totalCatches: data.total_catches,
      favoriteSpecies: data.favorite_species || [],
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

/**
 * Signs up a new user
 * @param email - User's email
 * @param password - User's password
 * @param username - Optional username
 * @returns Promise with user data and error status
 */
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

/**
 * Signs in an existing user
 * @param email - User's email
 * @param password - User's password
 * @returns Promise with user data and error status
 */
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

/**
 * Signs out the current user
 * @returns Promise with error status
 */
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
import {
  createFishingLocation,
  createWaterCondition,
  createHatchEvent,
  createGuide,
  createCatchRecord,
  createFishingReport,
  createComment,
} from '../lib/database';
import { FishingLocation, WaterCondition, HatchEvent, Guide, CatchRecord, FishingReport, Comment } from '../types';

/**
 * Database Population Script
 * 
 * This script follows SOLID principles:
 * - Single Responsibility: Each data type has its own creation logic
 * - Open/Closed: Easy to add new data types without modifying existing code
 * - Dependency Inversion: Uses database service layer abstractions
 * 
 * The script creates realistic sample data for all database tables,
 * maintaining referential integrity between related entities.
 */

// Sample data for various tables
const sampleLocations: Omit<FishingLocation, 'id' | 'rating' | 'reviewCount'>[] = [
  {
    name: 'Clearwater River',
    latitude: 46.7322,
    longitude: -114.0093,
    type: 'river',
    difficulty: 'intermediate',
    species: ['Rainbow Trout', 'Cutthroat Trout'],
    access: 'public',
    regulations: 'Catch and release only for trout over 18 inches. Barbless hooks required.',
  },
  {
    name: 'Lake Como',
    latitude: 46.3322,
    longitude: -114.1093,
    type: 'lake',
    difficulty: 'beginner',
    species: ['Largemouth Bass', 'Perch', 'Bluegill'],
    access: 'public',
    regulations: 'Standard state regulations apply. Daily limit: 5 bass, 10 panfish.',
  },
  {
    name: 'Bitterroot River',
    latitude: 46.5000,
    longitude: -114.1500,
    type: 'river',
    difficulty: 'advanced',
    species: ['Brown Trout', 'Rainbow Trout', 'Mountain Whitefish'],
    access: 'guided',
    regulations: 'Guided trips only. Barbless hooks required. No bait fishing.',
  },
  {
    name: 'Rock Creek',
    latitude: 46.6500,
    longitude: -113.8000,
    type: 'stream',
    difficulty: 'intermediate',
    species: ['Brook Trout', 'Cutthroat Trout'],
    access: 'public',
    regulations: 'Fly fishing only. Catch and release for all native species.',
  },
];

const sampleHatchEvents: Omit<HatchEvent, 'id' | 'startDate' | 'endDate'>[] = [
  {
    insect: 'Blue Winged Olive',
    region: 'Western Montana',
    peakTime: 'Late afternoon',
    recommendedFlies: ['BWO Parachute #18', 'Pheasant Tail Nymph #16', 'RS2 #18'],
    notes: 'Best during overcast conditions and light rain. Fish rising activity increases significantly.',
  },
  {
    insect: 'Pale Morning Dun',
    region: 'Central Montana',
    peakTime: 'Mid-morning',
    recommendedFlies: ['PMD Sparkle Dun #16', 'PMD Nymph #18', 'Barr Emerger #16'],
    notes: 'Strong emergence during warm, sunny mornings. Look for spinner falls in the evening.',
  },
  {
    insect: 'Caddisfly',
    region: 'Southwestern Montana',
    peakTime: 'Evening',
    recommendedFlies: ['Elk Hair Caddis #14', 'LaFontaine Sparkle Pupa #16', 'X-Caddis #14'],
    notes: 'Strong emergence during twilight hours. Fish often feed aggressively on emerging pupae.',
  },
  {
    insect: 'March Brown',
    region: 'Northern Montana',
    peakTime: 'Afternoon',
    recommendedFlies: ['March Brown Dun #12', 'Hare\'s Ear Nymph #14', 'Partridge & Orange #14'],
    notes: 'Early season hatch. Best fishing during warm spring afternoons.',
  },
];

const sampleGuides: Omit<Guide, 'id'>[] = [
  {
    name: 'Jake Morrison',
    location: 'Bozeman, MT',
    rating: 4.9,
    specialties: ['Dry Fly Fishing', 'Nymph Fishing', 'Brown Trout'],
    priceRange: '$500-600/day',
    contact: 'jake.morrison@montanaflies.com',
    verified: true,
    bio: 'Professional fly fishing guide with 15+ years experience on Montana rivers. Specializes in technical dry fly fishing and reading water. USCG licensed and insured.',
    photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
  {
    name: 'Sarah Chen',
    location: 'Missoula, MT',
    rating: 4.8,
    specialties: ['Streamer Fishing', 'Beginner Instruction', 'Photography'],
    priceRange: '$450-550/day',
    contact: 'sarah@bigskyfishing.com',
    verified: true,
    bio: 'Passionate about teaching new anglers the art of fly fishing. Certified casting instructor with a background in aquatic biology. Offers photography services.',
    photos: ['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
  {
    name: 'Mike Rodriguez',
    location: 'Livingston, MT',
    rating: 4.7,
    specialties: ['Spring Creek Fishing', 'Technical Presentations', 'Entomology'],
    priceRange: '$400-500/day',
    contact: 'mike.rodriguez@yellowstoneflies.net',
    verified: false,
    bio: 'Spring creek specialist with deep knowledge of aquatic entomology. Focuses on technical presentations and matching the hatch.',
    photos: ['https://images.pexels.com/photos/931160/pexels-photo-931160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  },
];

/**
 * Main database population function
 * Creates sample data for all tables while maintaining referential integrity
 * 
 * @param userId - The authenticated user ID for user-specific data
 */
export async function populateDatabase(userId: string) {
  console.log('🎣 Starting database population...');

  try {
    // 1. Populate Fishing Locations
    console.log('📍 Creating fishing locations...');
    const createdLocations: FishingLocation[] = [];
    for (const loc of sampleLocations) {
      const newLoc = await createFishingLocation(loc);
      if (newLoc) {
        createdLocations.push(newLoc);
        console.log(`✅ Created location: ${newLoc.name}`);
      } else {
        console.error(`❌ Failed to create location: ${loc.name}`);
      }
    }

    // 2. Populate Water Conditions (linked to locations)
    if (createdLocations.length > 0) {
      console.log('🌊 Creating water conditions...');
      const waterConditionsData: Omit<WaterCondition, 'id' | 'lastUpdated'>[] = [
        {
          locationId: createdLocations[0].id,
          temperature: 55,
          clarity: 'clear',
          flow: 'normal',
          level: 2.5,
        },
        {
          locationId: createdLocations[1].id,
          temperature: 68,
          clarity: 'slightly_stained',
          flow: 'low',
          level: 1.2,
        },
        {
          locationId: createdLocations[2].id,
          temperature: 52,
          clarity: 'clear',
          flow: 'high',
          level: 3.8,
        },
        {
          locationId: createdLocations[3].id,
          temperature: 48,
          clarity: 'clear',
          flow: 'normal',
          level: 1.8,
        },
      ];
      
      for (const cond of waterConditionsData) {
        const newCond = await createWaterCondition(cond);
        if (newCond) {
          console.log(`✅ Created water condition for location: ${newCond.locationId}`);
        } else {
          console.error(`❌ Failed to create water condition for location: ${cond.locationId}`);
        }
      }
    }

    // 3. Populate Hatch Events
    console.log('🦟 Creating hatch events...');
    for (const hatch of sampleHatchEvents) {
      const fullHatch: HatchEvent = {
        ...hatch,
        id: '', // Will be generated by Supabase
        startDate: new Date('2025-06-01'), // Example dates
        endDate: new Date('2025-06-30'),
      };
      const newHatch = await createHatchEvent(fullHatch);
      if (newHatch) {
        console.log(`✅ Created hatch event: ${newHatch.insect}`);
      } else {
        console.error(`❌ Failed to create hatch event: ${hatch.insect}`);
      }
    }

    // 4. Populate Guides
    console.log('🎯 Creating guides...');
    for (const guide of sampleGuides) {
      const newGuide = await createGuide(guide);
      if (newGuide) {
        console.log(`✅ Created guide: ${newGuide.name}`);
      } else {
        console.error(`❌ Failed to create guide: ${guide.name}`);
      }
    }

    // 5. Populate Catch Records (requires userId and locationId)
    if (userId && createdLocations.length > 0) {
      console.log('🐟 Creating catch records...');
      const catchRecordsData: Omit<CatchRecord, 'id' | 'timestamp'>[] = [
        {
          userId: userId,
          locationId: createdLocations[0].id,
          species: 'Rainbow Trout',
          length: 18.5,
          weight: 2.1,
          photos: ['https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
          flyPattern: 'Elk Hair Caddis #14',
          weather: { 
            temperature: 60, 
            humidity: 70, 
            pressure: 29.9, 
            windSpeed: 5, 
            windDirection: 'NW', 
            cloudCover: 50, 
            condition: 'Partly Cloudy' 
          },
          waterCondition: { 
            locationId: createdLocations[0].id, 
            temperature: 55, 
            clarity: 'clear', 
            flow: 'normal', 
            level: 2.5, 
            lastUpdated: new Date() 
          },
          notes: 'Beautiful rainbow caught near the big bend. Rose to a perfectly presented caddis. Released after a quick photo.',
          isReleased: true,
        },
        {
          userId: userId,
          locationId: createdLocations[1].id,
          species: 'Largemouth Bass',
          length: 16.0,
          weight: 2.8,
          photos: ['https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
          flyPattern: 'Clouser Minnow #6',
          weather: { 
            temperature: 75, 
            humidity: 60, 
            pressure: 30.1, 
            windSpeed: 8, 
            windDirection: 'S', 
            cloudCover: 20, 
            condition: 'Sunny' 
          },
          waterCondition: { 
            locationId: createdLocations[1].id, 
            temperature: 68, 
            clarity: 'slightly_stained', 
            flow: 'low', 
            level: 1.2, 
            lastUpdated: new Date() 
          },
          notes: 'Great bass fishing today! This one hit the streamer hard near the weed line.',
          isReleased: false,
        },
        {
          userId: userId,
          locationId: createdLocations[2].id,
          species: 'Brown Trout',
          length: 22.0,
          weight: 4.2,
          photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
          flyPattern: 'Woolly Bugger #8',
          weather: { 
            temperature: 58, 
            humidity: 80, 
            pressure: 29.7, 
            windSpeed: 12, 
            windDirection: 'W', 
            cloudCover: 80, 
            condition: 'Overcast' 
          },
          waterCondition: { 
            locationId: createdLocations[2].id, 
            temperature: 52, 
            clarity: 'clear', 
            flow: 'high', 
            level: 3.8, 
            lastUpdated: new Date() 
          },
          notes: 'Trophy brown! Fought like crazy in the high water. Perfect conditions for streamer fishing.',
          isReleased: true,
        },
      ];
      
      for (const record of catchRecordsData) {
        const newRecord = await createCatchRecord({ ...record, timestamp: new Date() });
        if (newRecord) {
          console.log(`✅ Created catch record for species: ${newRecord.species}`);
        } else {
          console.error(`❌ Failed to create catch record for species: ${record.species}`);
        }
      }
    } else {
      console.warn('⚠️ Skipping catch record population: userId or locations not available. Please sign in first.');
    }

    // 6. Populate Fishing Reports (requires userId and locationId)
    const createdReports: FishingReport[] = [];
    if (userId && createdLocations.length > 0) {
      console.log('📝 Creating fishing reports...');
      const fishingReportsData: Omit<FishingReport, 'id' | 'timestamp' | 'comments' | 'likes'>[] = [
        {
          userId: userId,
          locationId: createdLocations[0].id,
          title: 'Excellent Caddis Hatch on Clearwater',
          description: 'Had an amazing day on the Clearwater River today. The caddis hatch was incredible around 6 PM. Fish were rising everywhere and taking dry flies eagerly. Water conditions were perfect with good clarity and normal flows.',
          conditions: 'Clear water, normal flow, 55°F, partly cloudy skies',
          success: 5,
          photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        },
        {
          userId: userId,
          locationId: createdLocations[1].id,
          title: 'Bass Fishing Success at Lake Como',
          description: 'Found some good bass action near the lily pads at Lake Como. Poppers and streamers were both effective. The fish were aggressive and provided great fights. Perfect weather for a day on the water.',
          conditions: 'Slightly stained water, low flow, 68°F, sunny',
          success: 4,
          photos: ['https://images.pexels.com/photos/931160/pexels-photo-931160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        },
        {
          userId: userId,
          locationId: createdLocations[2].id,
          title: 'High Water Streamer Fishing on Bitterroot',
          description: 'The Bitterroot is running high but clear. Perfect conditions for swinging streamers. Landed several nice browns using weighted woolly buggers. The fish were holding in the deeper pools and eddies.',
          conditions: 'Clear water, high flow, 52°F, overcast',
          success: 4,
          photos: ['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
        },
      ];
      
      for (const report of fishingReportsData) {
        const newReport = await createFishingReport({ ...report, timestamp: new Date() });
        if (newReport) {
          createdReports.push(newReport);
          console.log(`✅ Created fishing report: ${newReport.title}`);
        } else {
          console.error(`❌ Failed to create fishing report: ${report.title}`);
        }
      }
    } else {
      console.warn('⚠️ Skipping fishing report population: userId or locations not available. Please sign in first.');
    }

    // 7. Populate Comments (requires userId and reportId)
    if (userId && createdReports.length > 0) {
      console.log('💬 Creating comments...');
      const commentsData: Omit<Comment, 'id' | 'username'>[] = [
        {
          reportId: createdReports[0].id,
          userId: userId,
          content: 'Sounds like an amazing day! What size caddis patterns were working best?',
          timestamp: new Date(),
        },
        {
          reportId: createdReports[0].id,
          userId: userId,
          content: 'I love fishing the Clearwater during caddis hatches. The evening rise can be incredible!',
          timestamp: new Date(),
        },
        {
          reportId: createdReports[1].id,
          userId: userId,
          content: 'Nice bass! Lake Como is always a reliable spot. Did you try any topwater patterns?',
          timestamp: new Date(),
        },
        {
          reportId: createdReports[2].id,
          userId: userId,
          content: 'High water streamer fishing is so much fun. Those browns fight hard in the current!',
          timestamp: new Date(),
        },
      ];
      
      for (const comment of commentsData) {
        const newComment = await createComment(comment);
        if (newComment) {
          console.log(`✅ Created comment for report: ${newComment.reportId}`);
        } else {
          console.error(`❌ Failed to create comment for report: ${comment.reportId}`);
        }
      }
    } else {
      console.warn('⚠️ Skipping comments population: userId or reports not available. Please sign in first.');
    }

    console.log('🎉 Database population complete!');
    console.log(`📊 Summary:`);
    console.log(`   • ${createdLocations.length} fishing locations created`);
    console.log(`   • ${sampleHatchEvents.length} hatch events created`);
    console.log(`   • ${sampleGuides.length} guides created`);
    console.log(`   • Water conditions created for all locations`);
    if (userId) {
      console.log(`   • Catch records, reports, and comments created for user`);
    }
    
  } catch (error) {
    console.error('💥 Error during database population:', error);
    throw error;
  }
}
import { FishingLocation, WaterCondition, HatchEvent, CatchRecord, FishingReport, Guide, User, WeatherCondition } from '@/types';

// Mock Fishing Locations
export const mockFishingLocations: FishingLocation[] = [
  {
    id: '1',
    name: 'Madison River',
    latitude: 45.6587,
    longitude: -111.1780,
    type: 'river',
    difficulty: 'intermediate',
    species: ['Brown Trout', 'Rainbow Trout', 'Mountain Whitefish'],
    access: 'public',
    regulations: 'Catch and release only. Barbless hooks required. No fishing from boats.',
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: '2',
    name: 'Yellowstone River',
    latitude: 45.6770,
    longitude: -110.9733,
    type: 'river',
    difficulty: 'advanced',
    species: ['Cutthroat Trout', 'Brown Trout', 'Rainbow Trout'],
    access: 'public',
    regulations: 'Daily limit: 2 trout over 13 inches. Barbless hooks recommended.',
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: '3',
    name: 'Hebgen Lake',
    latitude: 44.8587,
    longitude: -111.3280,
    type: 'lake',
    difficulty: 'beginner',
    species: ['Rainbow Trout', 'Brown Trout', 'Grayling'],
    access: 'public',
    regulations: 'Standard Montana fishing regulations apply. Boat fishing allowed.',
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: '4',
    name: 'Rock Creek',
    latitude: 46.0587,
    longitude: -113.2780,
    type: 'stream',
    difficulty: 'intermediate',
    species: ['Cutthroat Trout', 'Bull Trout', 'Brook Trout'],
    access: 'public',
    regulations: 'Bull trout must be released immediately. Single barbless hooks only.',
    rating: 4.6,
    reviewCount: 156
  },
  {
    id: '5',
    name: 'Private Ranch Pond',
    latitude: 45.2587,
    longitude: -112.1780,
    type: 'pond',
    difficulty: 'beginner',
    species: ['Rainbow Trout', 'Brook Trout'],
    access: 'private',
    regulations: 'Guide required. Catch and release only. Premium experience.',
    rating: 4.7,
    reviewCount: 34
  }
];

// Mock Water Conditions
export const mockWaterConditions: WaterCondition[] = [
  {
    locationId: '1',
    temperature: 58,
    clarity: 'clear',
    flow: 'normal',
    level: 2.3,
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    locationId: '2',
    temperature: 62,
    clarity: 'slightly_stained',
    flow: 'high',
    level: 3.1,
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
  },
  {
    locationId: '3',
    temperature: 65,
    clarity: 'clear',
    flow: 'normal',
    level: 1.8,
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  },
  {
    locationId: '4',
    temperature: 55,
    clarity: 'stained',
    flow: 'low',
    level: 1.2,
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  }
];

// Mock Hatch Events
export const mockHatchEvents: HatchEvent[] = [
  {
    id: '1',
    insect: 'Blue Winged Olive',
    region: 'Southwestern Montana',
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-05-30'),
    peakTime: 'Late afternoon (2-6 PM)',
    recommendedFlies: ['BWO Parachute #18', 'Pheasant Tail #16', 'BWO Emerger #18'],
    notes: 'Best during overcast conditions and light rain. Fish rising activity increases significantly.'
  },
  {
    id: '2',
    insect: 'Pale Morning Dun',
    region: 'Madison River Valley',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-07-15'),
    peakTime: 'Mid-morning (9-11 AM)',
    recommendedFlies: ['PMD Sparkle Dun #16', 'PMD Nymph #18', 'PMD Cripple #16'],
    notes: 'Peak activity during warm, sunny mornings. Look for spinner falls in the evening.'
  },
  {
    id: '3',
    insect: 'Caddis Hatch',
    region: 'Yellowstone Area',
    startDate: new Date('2024-05-20'),
    endDate: new Date('2024-08-15'),
    peakTime: 'Evening (6-9 PM)',
    recommendedFlies: ['Elk Hair Caddis #14', 'Caddis Emerger #16', 'X-Caddis #14'],
    notes: 'Excellent dry fly fishing during emergence. Fish often feed aggressively.'
  },
  {
    id: '4',
    insect: 'Trico Spinner',
    region: 'Spring Creeks',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-09-30'),
    peakTime: 'Early morning (6-9 AM)',
    recommendedFlies: ['Trico Spinner #20', 'Trico Dun #22', 'Poly Wing Spinner #20'],
    notes: 'Technical fishing with small flies. Fish are very selective during this hatch.'
  }
];

// Mock Catch Records
export const mockCatchRecords: CatchRecord[] = [
  {
    id: '1',
    userId: 'user1',
    locationId: '1',
    species: 'Brown Trout',
    length: 18,
    weight: 2.5,
    photos: ['https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg'],
    flyPattern: 'Pheasant Tail Nymph #16',
    weather: {
      temperature: 58,
      humidity: 65,
      pressure: 30.15,
      windSpeed: 5,
      windDirection: 'SW',
      cloudCover: 40,
      condition: 'Partly Cloudy'
    },
    waterCondition: {
      locationId: '1',
      temperature: 58,
      clarity: 'clear',
      flow: 'normal',
      level: 2.3,
      lastUpdated: new Date()
    },
    notes: 'Beautiful brown trout caught on a dead drift in the deeper pool. Fish was very healthy and fought well.',
    isReleased: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    coordinates: {
      latitude: 45.6587,
      longitude: -111.1780
    }
  },
  {
    id: '2',
    userId: 'user1',
    locationId: '2',
    species: 'Cutthroat Trout',
    length: 16,
    weight: 1.8,
    photos: ['https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'],
    flyPattern: 'Elk Hair Caddis #14',
    weather: {
      temperature: 62,
      humidity: 58,
      pressure: 30.22,
      windSpeed: 8,
      windDirection: 'NW',
      cloudCover: 25,
      condition: 'Sunny'
    },
    waterCondition: {
      locationId: '2',
      temperature: 62,
      clarity: 'slightly_stained',
      flow: 'high',
      level: 3.1,
      lastUpdated: new Date()
    },
    notes: 'Caught during evening caddis hatch. Fish rose aggressively to the dry fly.',
    isReleased: true,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    coordinates: {
      latitude: 45.6770,
      longitude: -110.9733
    }
  },
  {
    id: '3',
    userId: 'user1',
    locationId: '3',
    species: 'Rainbow Trout',
    length: 14,
    weight: 1.2,
    photos: [],
    flyPattern: 'Woolly Bugger #10',
    weather: {
      temperature: 65,
      humidity: 72,
      pressure: 29.98,
      windSpeed: 12,
      windDirection: 'W',
      cloudCover: 60,
      condition: 'Overcast'
    },
    waterCondition: {
      locationId: '3',
      temperature: 65,
      clarity: 'clear',
      flow: 'normal',
      level: 1.8,
      lastUpdated: new Date()
    },
    notes: 'Trolling with woolly bugger in deeper water. Good fight for the size.',
    isReleased: true,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  }
];

// Mock Fishing Reports
export const mockFishingReports: FishingReport[] = [
  {
    id: '1',
    userId: 'user2',
    locationId: '1',
    title: 'Excellent BWO Hatch on Madison',
    description: 'Had an incredible day on the Madison River today. The blue winged olive hatch was phenomenal around 3 PM. Fish were rising everywhere and very willing to take properly presented flies. Water conditions were perfect with good clarity and normal flows.',
    conditions: 'Overcast skies, 58°F water temp, normal flows, clear water',
    success: 5,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg'],
    likes: 23,
    comments: [
      {
        id: '1',
        userId: 'user3',
        username: 'FlyFisher_Mike',
        content: 'Great report! I was thinking of heading there this weekend. What size BWO were you using?',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000) // 20 hours ago
      },
      {
        id: '2',
        userId: 'user4',
        username: 'TroutHunter_Sarah',
        content: 'Awesome! The Madison has been fishing really well lately. Thanks for sharing!',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000) // 18 hours ago
      }
    ]
  },
  {
    id: '2',
    userId: 'user5',
    locationId: '4',
    title: 'Tough Conditions on Rock Creek',
    description: 'Fished Rock Creek yesterday and conditions were challenging. Water was stained from recent rains and flows were lower than normal. Had to work hard for each fish but managed to land a few nice cutthroat on small nymphs.',
    conditions: 'Stained water, 55°F water temp, low flows, cloudy skies',
    success: 2,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    photos: [],
    likes: 8,
    comments: [
      {
        id: '3',
        userId: 'user6',
        username: 'MontanaAngler',
        content: 'Rock Creek can be tricky when the water is off-color. Nice work sticking with it!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ]
  }
];

// Mock Guides
export const mockGuides: Guide[] = [
  {
    id: '1',
    name: 'Jake Morrison',
    location: 'Bozeman, MT',
    rating: 4.9,
    specialties: ['Brown Trout', 'Rainbow Trout', 'Dry Fly Fishing', 'Nymph Fishing'],
    priceRange: '$400-500/day',
    contact: 'jake.morrison@flyguide.com',
    verified: true,
    bio: 'Professional fly fishing guide with 15+ years experience on Montana rivers. Specializes in technical dry fly fishing and helping anglers improve their casting and presentation skills.',
    photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg']
  },
  {
    id: '2',
    name: 'Sarah Chen',
    location: 'Missoula, MT',
    rating: 4.8,
    specialties: ['Nymph Fishing', 'Streamer Fishing', 'Beginner Instruction', 'Women\'s Clinics'],
    priceRange: '$350-450/day',
    contact: 'sarah@montanaflies.com',
    verified: true,
    bio: 'Specializing in technical nymph fishing and helping beginners build confidence on the water. Offers specialized instruction for women and youth anglers.',
    photos: ['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg']
  },
  {
    id: '3',
    name: 'Tom Rodriguez',
    location: 'West Yellowstone, MT',
    rating: 4.7,
    specialties: ['Cutthroat Trout', 'Yellowstone Fishing', 'Backcountry', 'Photography'],
    priceRange: '$450-600/day',
    contact: 'tom@yellowstoneflies.com',
    verified: true,
    bio: 'Expert guide for Yellowstone National Park waters. Combines fishing expertise with professional photography to capture your memorable moments.',
    photos: ['https://images.pexels.com/photos/931160/pexels-photo-931160.jpeg']
  }
];

// Mock User Data
export const mockUser: User = {
  id: 'user1',
  username: 'FlyFisher_Pro',
  email: 'angler@example.com',
  avatar: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
  location: 'Bozeman, MT',
  experience: 'intermediate',
  totalCatches: 47,
  favoriteSpecies: ['Brown Trout', 'Cutthroat Trout', 'Rainbow Trout'],
  joinDate: new Date('2023-03-15')
};

// Data access functions
export function getFishingLocations(): Promise<FishingLocation[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFishingLocations), 500);
  });
}

export function getWaterConditions(): Promise<WaterCondition[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWaterConditions), 300);
  });
}

export function getHatchEvents(): Promise<HatchEvent[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHatchEvents), 400);
  });
}

export function getCatchRecords(userId?: string): Promise<CatchRecord[]> {
  return new Promise((resolve) => {
    const filteredRecords = userId 
      ? mockCatchRecords.filter(record => record.userId === userId)
      : mockCatchRecords;
    setTimeout(() => resolve(filteredRecords), 600);
  });
}

export function getFishingReports(): Promise<FishingReport[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFishingReports), 450);
  });
}

export function getGuides(): Promise<Guide[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGuides), 350);
  });
}

export function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser), 200);
  });
}

// Additional utility functions for specific data needs
export function getWaterConditionsByLocationId(locationId: string): Promise<WaterCondition | null> {
  return new Promise((resolve) => {
    const condition = mockWaterConditions.find(c => c.locationId === locationId);
    setTimeout(() => resolve(condition || null), 200);
  });
}

export function getActiveHatchEvents(): Promise<HatchEvent[]> {
  return new Promise((resolve) => {
    const now = new Date();
    const activeEvents = mockHatchEvents.filter(event => 
      now >= event.startDate && now <= event.endDate
    );
    setTimeout(() => resolve(activeEvents), 300);
  });
}

export function getVerifiedGuides(): Promise<Guide[]> {
  return new Promise((resolve) => {
    const verifiedGuides = mockGuides.filter(guide => guide.verified);
    setTimeout(() => resolve(verifiedGuides), 250);
  });
}
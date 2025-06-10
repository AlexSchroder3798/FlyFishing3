export interface FishingLocation {
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
  reviewCount: number;
}

export interface WaterCondition {
  locationId: string;
  temperature: number;
  clarity: 'clear' | 'slightly_stained' | 'stained' | 'muddy';
  flow: 'low' | 'normal' | 'high' | 'flood';
  level: number;
  lastUpdated: Date;
}

export interface CatchRecord {
  id: string;
  userId: string;
  locationId: string;
  species: string;
  length?: number;
  weight?: number;
  photos: string[];
  flyPattern: string;
  weather: WeatherCondition;
  waterCondition: WaterCondition;
  notes: string;
  isReleased: boolean;
  timestamp: Date;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface WeatherCondition {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  cloudCover: number;
  condition: string;
}

export interface FlyPattern {
  id: string;
  name: string;
  category: 'dry' | 'nymph' | 'wet' | 'streamer' | 'terrestrial';
  season: string[];
  species: string[];
  materials: string[];
  instructions: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
}

export interface FishingReport {
  id: string;
  userId: string;
  locationId: string;
  title: string;
  description: string;
  conditions: string;
  success: number; // 1-5 scale
  timestamp: Date;
  photos: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  reportId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  location?: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  totalCatches: number;
  favoriteSpecies: string[];
  joinDate: Date;
}

export interface Guide {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  priceRange: string;
  contact: string;
  verified: boolean;
  bio: string;
  photos: string[];
}

export interface HatchEvent {
  id: string;
  insect: string;
  region: string;
  startDate: Date;
  endDate: Date;
  peakTime: string;
  recommendedFlies: string[];
  notes: string;
}
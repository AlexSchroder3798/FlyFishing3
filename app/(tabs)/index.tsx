import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Thermometer, Droplets, Wind } from 'lucide-react-native';
import LocationCard from '@/components/LocationCard';
import WaterConditionsCard from '@/components/WaterConditionsCard';
import HatchCalendarCard from '@/components/HatchCalendarCard';
import { FishingLocation, WaterCondition, HatchEvent } from '@/types';

export default function ExploreTab() {
  const [locations, setLocations] = useState<FishingLocation[]>([]);
  const [waterConditions, setWaterConditions] = useState<WaterCondition[]>([]);
  const [hatchEvents, setHatchEvents] = useState<HatchEvent[]>([]);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock data for demonstration
    const mockLocations: FishingLocation[] = [
      {
        id: '1',
        name: 'Ruby River',
        latitude: 45.3311,
        longitude: -112.5362,
        type: 'river',
        difficulty: 'intermediate',
        species: ['Brown Trout', 'Rainbow Trout'],
        access: 'public',
        regulations: 'Artificial flies only, catch and release',
        rating: 4.5,
        reviewCount: 127
      },
      {
        id: '2',
        name: 'Madison River',
        latitude: 44.6472,
        longitude: -111.1045,
        type: 'river',
        difficulty: 'advanced',
        species: ['Brown Trout', 'Rainbow Trout', 'Mountain Whitefish'],
        access: 'public',
        regulations: 'Standard regulations apply',
        rating: 4.8,
        reviewCount: 203
      }
    ];

    const mockConditions: WaterCondition[] = [
      {
        locationId: '1',
        temperature: 52,
        clarity: 'clear',
        flow: 'normal',
        level: 3.2,
        lastUpdated: new Date()
      },
      {
        locationId: '2',
        temperature: 48,
        clarity: 'slightly_stained',
        flow: 'high',
        level: 4.1,
        lastUpdated: new Date()
      }
    ];

    const mockHatches: HatchEvent[] = [
      {
        id: '1',
        insect: 'Blue Winged Olive',
        region: 'Southwestern Montana',
        startDate: new Date('2024-04-15'),
        endDate: new Date('2024-05-30'),
        peakTime: 'Late afternoon',
        recommendedFlies: ['BWO Parachute #18', 'Pheasant Tail #16'],
        notes: 'Best during overcast conditions'
      }
    ];

    setLocations(mockLocations);
    setWaterConditions(mockConditions);
    setHatchEvents(mockHatches);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Waters</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Conditions</Text>
          {waterConditions.map((condition) => {
            const location = locations.find(l => l.id === condition.locationId);
            return location ? (
              <WaterConditionsCard
                key={condition.locationId}
                location={location}
                condition={condition}
              />
            ) : null;
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hatch Calendar</Text>
          {hatchEvents.map((hatch) => (
            <HatchCalendarCard key={hatch.id} hatch={hatch} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Locations</Text>
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
});
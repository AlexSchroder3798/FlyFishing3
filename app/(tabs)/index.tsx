import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Thermometer, Droplets, Wind } from 'lucide-react-native';
import LocationCard from '@/components/LocationCard';
import WaterConditionsCard from '@/components/WaterConditionsCard';
import HatchCalendarCard from '@/components/HatchCalendarCard';
import { FishingLocation, WaterCondition, HatchEvent } from '@/types';
import { getFishingLocations, getWaterConditions, getHatchEvents } from '@/lib/database';

export default function ExploreTab() {
  const [locations, setLocations] = useState<FishingLocation[]>([]);
  const [waterConditions, setWaterConditions] = useState<WaterCondition[]>([]);
  const [hatchEvents, setHatchEvents] = useState<HatchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load data from Supabase
      const [locationsData, conditionsData, hatchData] = await Promise.all([
        getFishingLocations(),
        getWaterConditions(),
        getHatchEvents()
      ]);

      setLocations(locationsData);
      setWaterConditions(conditionsData);
      setHatchEvents(hatchData);
    } catch (err) {
      console.error('Error loading explore data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Waters</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading fishing data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore Waters</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Waters</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {waterConditions.length > 0 && (
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
        )}

        {hatchEvents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hatch Calendar</Text>
            {hatchEvents.map((hatch) => (
              <HatchCalendarCard key={hatch.id} hatch={hatch} />
            ))}
          </View>
        )}

        {locations.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Premium Locations</Text>
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No fishing locations found</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back later or add some locations to get started
            </Text>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4b5563',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
});
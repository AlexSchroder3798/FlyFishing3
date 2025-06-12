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
        <View style={styles.webContainer}>
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
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webContainer}>
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
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webContainer}>
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
              <View style={styles.cardsGrid}>
                {waterConditions.map((condition) => {
                  const location = locations.find(l => l.id === condition.locationId);
                  return location ? (
                    <View key={condition.locationId} style={styles.cardWrapper}>
                      <WaterConditionsCard
                        location={location}
                        condition={condition}
                      />
                    </View>
                  ) : null;
                })}
              </View>
            </View>
          )}

          {hatchEvents.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hatch Calendar</Text>
              <View style={styles.cardsGrid}>
                {hatchEvents.map((hatch) => (
                  <View key={hatch.id} style={styles.cardWrapper}>
                    <HatchCalendarCard hatch={hatch} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {locations.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Premium Locations</Text>
              <View style={styles.cardsGrid}>
                {locations.map((location) => (
                  <View key={location.id} style={styles.cardWrapper}>
                    <LocationCard location={location} />
                  </View>
                ))}
              </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  webContainer: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
      },
      default: {},
    }),
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
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#e5e7eb',
        borderRightColor: '#e5e7eb',
      },
      default: {},
    }),
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
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#e5e7eb',
        borderRightColor: '#e5e7eb',
      },
      default: {},
    }),
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  cardsGrid: {
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
      },
      default: {
        flexDirection: 'column',
      },
    }),
  },
  cardWrapper: {
    ...Platform.select({
      web: {
        width: '50%',
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      default: {
        width: '100%',
      },
    }),
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
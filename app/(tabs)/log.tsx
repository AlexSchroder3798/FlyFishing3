import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, Fish, TrendingUp } from 'lucide-react-native';
import CatchCard from '@/components/CatchCard';
import StatsCard from '@/components/StatsCard';
import { CatchRecord } from '@/types';

export default function LogTab() {
  const [catches, setCatches] = useState<CatchRecord[]>([]);
  const [stats, setStats] = useState({
    totalCatches: 0,
    totalSpecies: 0,
    bestMonth: '',
    averageSize: 0
  });

  useEffect(() => {
    loadCatchData();
  }, []);

  const loadCatchData = () => {
    // Mock catch data
    const mockCatches: CatchRecord[] = [
      {
        id: '1',
        userId: 'user1',
        locationId: '1',
        species: 'Brown Trout',
        length: 18,
        weight: 2.5,
        photos: ['https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg'],
        flyPattern: 'Adams #14',
        weather: {
          temperature: 65,
          humidity: 70,
          pressure: 30.12,
          windSpeed: 5,
          windDirection: 'SW',
          cloudCover: 40,
          condition: 'Partly Cloudy'
        },
        waterCondition: {
          locationId: '1',
          temperature: 52,
          clarity: 'clear',
          flow: 'normal',
          level: 3.2,
          lastUpdated: new Date()
        },
        notes: 'Great fight, caught on the first cast near the fallen log.',
        isReleased: true,
        timestamp: new Date('2024-01-15T14:30:00'),
        coordinates: {
          latitude: 45.3311,
          longitude: -112.5362
        }
      },
      {
        id: '2',
        userId: 'user1',
        locationId: '2',
        species: 'Rainbow Trout',
        length: 14,
        weight: 1.8,
        photos: ['https://images.pexels.com/photos/1397876/pexels-photo-1397876.jpeg'],
        flyPattern: 'Elk Hair Caddis #16',
        weather: {
          temperature: 58,
          humidity: 65,
          pressure: 29.98,
          windSpeed: 8,
          windDirection: 'NW',
          cloudCover: 60,
          condition: 'Overcast'
        },
        waterCondition: {
          locationId: '2',
          temperature: 48,
          clarity: 'slightly_stained',
          flow: 'high',
          level: 4.1,
          lastUpdated: new Date()
        },
        notes: 'Active fish during caddis hatch, released immediately.',
        isReleased: true,
        timestamp: new Date('2024-01-12T16:45:00'),
        coordinates: {
          latitude: 44.6472,
          longitude: -111.1045
        }
      }
    ];

    setCatches(mockCatches);
    setStats({
      totalCatches: mockCatches.length,
      totalSpecies: new Set(mockCatches.map(c => c.species)).size,
      bestMonth: 'January',
      averageSize: mockCatches.reduce((sum, c) => sum + (c.length || 0), 0) / mockCatches.length
    });
  };

  const handleAddCatch = () => {
    // Navigate to add catch screen
    console.log('Add new catch');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Fishing Log</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCatch}
        >
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Season Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              icon={<Fish size={20} color="#2563eb" />}
              title="Total Catches"
              value={stats.totalCatches.toString()}
            />
            <StatsCard
              icon={<TrendingUp size={20} color="#059669" />}
              title="Species"
              value={stats.totalSpecies.toString()}
            />
            <StatsCard
              icon={<Calendar size={20} color="#dc2626" />}
              title="Best Month"
              value={stats.bestMonth}
            />
            <StatsCard
              icon={<Fish size={20} color="#7c3aed" />}
              title="Avg Size"
              value={`${stats.averageSize.toFixed(1)}"`}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Catches</Text>
          {catches.map((catchRecord) => (
            <CatchCard key={catchRecord.id} catch={catchRecord} />
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsSection: {
    marginBottom: 24,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
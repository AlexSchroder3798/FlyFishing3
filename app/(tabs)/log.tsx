import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, Fish, TrendingUp } from 'lucide-react-native';
import CatchCard from '@/components/CatchCard';
import StatsCard from '@/components/StatsCard';
import { CatchRecord } from '@/types';
import { getCatchRecords, getCurrentUser } from '@/lib/database';

export default function LogTab() {
  const [catches, setCatches] = useState<CatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalCatches: 0,
    totalSpecies: 0,
    bestMonth: '',
    averageSize: 0
  });

  useEffect(() => {
    loadCatchData();
  }, []);

  const loadCatchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user to filter catches
      const user = await getCurrentUser();
      
      // Load catch records from Supabase
      const catchData = user ? await getCatchRecords(user.id) : [];
      
      setCatches(catchData);
      calculateStats(catchData);
    } catch (err) {
      console.error('Error loading catch data:', err);
      setError('Failed to load catch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (catchData: CatchRecord[]) => {
    if (catchData.length === 0) {
      setStats({
        totalCatches: 0,
        totalSpecies: 0,
        bestMonth: 'N/A',
        averageSize: 0
      });
      return;
    }

    const totalCatches = catchData.length;
    const species = new Set(catchData.map(c => c.species));
    const totalSpecies = species.size;
    
    // Calculate average size (only for catches with length data)
    const catchesWithLength = catchData.filter(c => c.length && c.length > 0);
    const averageSize = catchesWithLength.length > 0
      ? catchesWithLength.reduce((sum, c) => sum + (c.length || 0), 0) / catchesWithLength.length
      : 0;

    // Find best month (month with most catches)
    const monthCounts: { [key: string]: number } = {};
    catchData.forEach(c => {
      const month = c.timestamp.toLocaleDateString('en-US', { month: 'long' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    
    const bestMonth = Object.keys(monthCounts).reduce((a, b) => 
      monthCounts[a] > monthCounts[b] ? a : b, 'N/A'
    );

    setStats({
      totalCatches,
      totalSpecies,
      bestMonth,
      averageSize
    });
  };

  const handleAddCatch = () => {
    // Navigate to add catch screen
    console.log('Add new catch');
  };

  const handleRefresh = () => {
    loadCatchData();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>My Fishing Log</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddCatch}
            >
              <Plus size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Loading your catches...</Text>
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
            <Text style={styles.title}>My Fishing Log</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddCatch}
            >
              <Plus size={20} color="#ffffff" />
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
                value={stats.averageSize > 0 ? `${stats.averageSize.toFixed(1)}"` : 'N/A'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Catches</Text>
            <View style={styles.catchesGrid}>
              {catches.length > 0 ? (
                catches.map((catchRecord) => (
                  <View key={catchRecord.id} style={styles.catchWrapper}>
                    <CatchCard catch={catchRecord} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Fish size={48} color="#9ca3af" />
                  <Text style={styles.emptyStateText}>No catches yet</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Start logging your catches to track your fishing progress
                  </Text>
                  <TouchableOpacity style={styles.addFirstCatchButton} onPress={handleAddCatch}>
                    <Text style={styles.addFirstCatchText}>Add Your First Catch</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
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
  statsSection: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        marginHorizontal: -8,
      },
      default: {},
    }),
  },
  catchesGrid: {
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
  catchWrapper: {
    ...Platform.select({
      web: {
        width: '50%',
        paddingHorizontal: 8,
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
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      web: {
        width: '100%',
      },
      default: {},
    }),
  },
  emptyStateText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4b5563',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  addFirstCatchButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstCatchText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle, Users, Star, TrendingUp, MapPin } from 'lucide-react-native';
import ReportCard from '@/components/ReportCard';
import GuideCard from '@/components/GuideCard';
import { FishingReport, Guide } from '@/types';
import { getFishingReports, getGuides } from '@/lib/database';

export default function SocialTab() {
  const [activeTab, setActiveTab] = useState<'reports' | 'guides' | 'groups'>('reports');
  const [reports, setReports] = useState<FishingReport[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load data from Supabase
      const [reportsData, guidesData] = await Promise.all([
        getFishingReports(),
        getGuides()
      ]);

      setReports(reportsData);
      setGuides(guidesData);
    } catch (err) {
      console.error('Error loading social data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  const tabs = [
    { id: 'reports', name: 'Reports', icon: TrendingUp },
    { id: 'guides', name: 'Guides', icon: Star },
    { id: 'groups', name: 'Groups', icon: Users },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading community data...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (activeTab) {
      case 'reports':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Fishing Reports</Text>
            <View style={styles.cardsGrid}>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <View key={report.id} style={styles.cardWrapper}>
                    <ReportCard report={report} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <TrendingUp size={48} color="#9ca3af" />
                  <Text style={styles.emptyStateText}>No reports yet</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Be the first to share a fishing report with the community
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      case 'guides':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local Guides</Text>
            <View style={styles.cardsGrid}>
              {guides.length > 0 ? (
                guides.map((guide) => (
                  <View key={guide.id} style={styles.cardWrapper}>
                    <GuideCard guide={guide} />
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Star size={48} color="#9ca3af" />
                  <Text style={styles.emptyStateText}>No guides found</Text>
                  <Text style={styles.emptyStateSubtext}>
                    Check back later for local fishing guides
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      case 'groups':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fishing Groups</Text>
            <View style={styles.placeholderCard}>
              <Users size={48} color="#9ca3af" />
              <Text style={styles.placeholderText}>Groups feature coming soon!</Text>
              <Text style={styles.placeholderSubtext}>
                Connect with local fishing groups and organize trips together.
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.webContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <TouchableOpacity style={styles.messageButton}>
            <MessageCircle size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.id as any)}
              >
                <IconComponent 
                  size={18} 
                  color={isActive ? '#2563eb' : '#6b7280'} 
                />
                <Text style={[
                  styles.tabText,
                  isActive && styles.activeTabText
                ]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingBottom: Math.max(insets.bottom + 80, Platform.OS === 'ios' ? 100 : 88) }
          ]}
        >
          {renderContent()}
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
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
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
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2563eb',
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#2563eb',
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
  scrollViewContent: {
    flexGrow: 1,
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
    padding: 40,
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
    padding: 40,
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
  },
  placeholderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4b5563',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});
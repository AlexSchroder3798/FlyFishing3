import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Users, Star, TrendingUp, MapPin } from 'lucide-react-native';
import ReportCard from '@/components/ReportCard';
import GuideCard from '@/components/GuideCard';
import { FishingReport, Guide } from '@/types';

export default function SocialTab() {
  const [activeTab, setActiveTab] = useState<'reports' | 'guides' | 'groups'>('reports');

  const mockReports: FishingReport[] = [
    {
      id: '1',
      userId: 'user2',
      locationId: '1',
      title: 'Excellent Morning on Ruby River',
      description: 'Caught 5 browns this morning using BWO patterns. Water levels perfect and fish were actively feeding.',
      conditions: 'Clear, 52°F water, light breeze',
      success: 5,
      timestamp: new Date('2024-01-20T10:30:00'),
      photos: ['https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg'],
      likes: 12,
      comments: [
        {
          id: '1',
          userId: 'user3',
          username: 'FlyFisherMike',
          content: 'Great catch! What size BWO were you using?',
          timestamp: new Date('2024-01-20T11:00:00')
        }
      ]
    },
    {
      id: '2',
      userId: 'user4',
      locationId: '2',
      title: 'Tough Conditions on Madison',
      description: 'High water made it challenging, but managed to land a nice rainbow using heavy nymphs.',
      conditions: 'High flow, 48°F water, overcast',
      success: 3,
      timestamp: new Date('2024-01-19T15:45:00'),
      photos: ['https://images.pexels.com/photos/1397876/pexels-photo-1397876.jpeg'],
      likes: 8,
      comments: []
    }
  ];

  const mockGuides: Guide[] = [
    {
      id: '1',
      name: 'Jake Morrison',
      location: 'Bozeman, MT',
      rating: 4.9,
      specialties: ['Brown Trout', 'Rainbow Trout', 'Dry Fly Fishing'],
      priceRange: '$400-500/day',
      contact: 'jake.morrison@flyguide.com',
      verified: true,
      bio: 'Professional fly fishing guide with 15+ years experience on Montana rivers.',
      photos: ['https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      location: 'Missoula, MT',
      rating: 4.8,
      specialties: ['Nymph Fishing', 'Streamer Fishing', 'Beginner Instruction'],
      priceRange: '$350-450/day',
      contact: 'sarah@montanaflies.com',
      verified: true,
      bio: 'Specializing in technical nymph fishing and helping beginners build confidence.',
      photos: ['https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg']
    }
  ];

  const tabs = [
    { id: 'reports', name: 'Reports', icon: TrendingUp },
    { id: 'guides', name: 'Guides', icon: Star },
    { id: 'groups', name: 'Groups', icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'reports':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Fishing Reports</Text>
            {mockReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </View>
        );
      case 'guides':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local Guides</Text>
            {mockGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
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
    <SafeAreaView style={styles.container}>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
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
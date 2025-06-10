import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloudRain, Thermometer, Wind, Gauge, Database } from 'lucide-react-native';
import WeatherCard from '@/components/WeatherCard';
import SolunarCard from '@/components/SolunarCard';
import StreamFlowCard from '@/components/StreamFlowCard';
import { WeatherCondition, User } from '@/types';
import { getCurrentUser } from '@/lib/database';
import { populateDatabase } from '@/scripts/populate-db';

export default function ToolsTab() {
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPopulating, setIsPopulating] = useState(false);
  const [solunarData, setSolunarData] = useState({
    majorPeriods: ['6:15 AM - 8:15 AM', '6:45 PM - 8:45 PM'],
    minorPeriods: ['12:30 PM - 1:30 PM', '12:45 AM - 1:45 AM'],
    rating: 4,
    moonPhase: 'Waxing Crescent'
  });

  useEffect(() => {
    loadWeatherData();
    loadCurrentUser();
  }, []);

  const loadWeatherData = () => {
    // Mock weather data - in production this would come from a weather API
    const mockWeather: WeatherCondition = {
      temperature: 62,
      humidity: 68,
      pressure: 30.15,
      windSpeed: 7,
      windDirection: 'SW',
      cloudCover: 35,
      condition: 'Partly Cloudy'
    };
    
    setWeather(mockWeather);
  };

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const handlePopulateDb = async () => {
    if (!currentUser) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to populate the database with user-specific data.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Populate Database',
      'This will add sample fishing data to your database. This action cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Populate',
          style: 'destructive',
          onPress: async () => {
            setIsPopulating(true);
            try {
              console.log('🎣 Starting database population...');
              await populateDatabase(currentUser.id);
              Alert.alert(
                'Success!',
                'Database has been populated with sample data. You may need to refresh other tabs to see the changes.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Error populating database:', error);
              Alert.alert(
                'Error',
                'Failed to populate database. Please check the console for details.',
                [{ text: 'OK' }]
              );
            } finally {
              setIsPopulating(false);
            }
          }
        }
      ]
    );
  };

  const tools = [
    {
      id: 'barometer',
      title: 'Barometric Pressure',
      value: weather ? `${weather.pressure.toFixed(2)}"` : '--',
      trend: 'rising',
      icon: <Gauge size={24} color="#2563eb" />,
      description: 'Rising pressure - Good fishing conditions'
    },
    {
      id: 'humidity',
      title: 'Humidity',
      value: weather ? `${weather.humidity}%` : '--',
      trend: 'stable',
      icon: <CloudRain size={24} color="#059669" />,
      description: 'Optimal humidity for insect activity'
    }
  ];

  const flyRecommendations = [
    {
      pattern: 'Blue Winged Olive #18',
      reason: 'Current weather conditions favor BWO hatches',
      confidence: 85
    },
    {
      pattern: 'Pheasant Tail Nymph #16',
      reason: 'Overcast skies make nymphs effective',
      confidence: 78
    },
    {
      pattern: 'Elk Hair Caddis #14',
      reason: 'Evening emergence likely',
      confidence: 72
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fishing Tools</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {weather && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Weather</Text>
            <WeatherCard weather={weather} />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions Analysis</Text>
          <View style={styles.toolsGrid}>
            {tools.map((tool) => (
              <TouchableOpacity key={tool.id} style={styles.toolCard}>
                <View style={styles.toolHeader}>
                  {tool.icon}
                  <View style={styles.toolInfo}>
                    <Text style={styles.toolTitle}>{tool.title}</Text>
                    <Text style={styles.toolValue}>{tool.value}</Text>
                  </View>
                </View>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solunar Calendar</Text>
          <SolunarCard data={solunarData} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stream Flow Data</Text>
          <StreamFlowCard locationName="Ruby River" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fly Recommendations</Text>
          <View style={styles.recommendationsCard}>
            <Text style={styles.recommendationsTitle}>
              Based on Current Conditions
            </Text>
            {flyRecommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <View style={styles.recommendationHeader}>
                  <Text style={styles.patternName}>{rec.pattern}</Text>
                  <View style={styles.confidenceBadge}>
                    <Text style={styles.confidenceText}>{rec.confidence}%</Text>
                  </View>
                </View>
                <Text style={styles.recommendationReason}>{rec.reason}</Text>
              </View>
            ))}
          </View>
        </View>

        {__DEV__ && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Developer Tools</Text>
            <View style={styles.devCard}>
              <View style={styles.devHeader}>
                <Database size={20} color="#2563eb" />
                <Text style={styles.devTitle}>Database Population</Text>
              </View>
              <Text style={styles.devDescription}>
                Populate your database with realistic sample data including fishing locations, 
                water conditions, hatch events, guides, catch records, and reports.
              </Text>
              <TouchableOpacity 
                style={[styles.devButton, isPopulating && styles.devButtonDisabled]} 
                onPress={handlePopulateDb}
                disabled={isPopulating}
              >
                <Text style={styles.devButtonText}>
                  {isPopulating ? 'Populating Database...' : 'Populate Database with Sample Data'}
                </Text>
              </TouchableOpacity>
              {!currentUser && (
                <Text style={styles.devWarning}>
                  ⚠️ Sign in required for user-specific data (catches, reports, comments)
                </Text>
              )}
            </View>
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
  toolsGrid: {
    gap: 12,
  },
  toolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolInfo: {
    marginLeft: 12,
    flex: 1,
  },
  toolTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  toolValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  toolDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
  },
  recommendationsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  recommendationItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  patternName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  confidenceBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  recommendationReason: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
  },
  devCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  devHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  devTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  devDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 16,
  },
  devButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  devButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  devButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  devWarning: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#f59e0b',
    marginTop: 8,
    textAlign: 'center',
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloudRain, Thermometer, Wind, Gauge, Moon, Sun } from 'lucide-react-native';
import WeatherCard from '@/components/WeatherCard';
import SolunarCard from '@/components/SolunarCard';
import StreamFlowCard from '@/components/StreamFlowCard';
import { WeatherCondition } from '@/types';

export default function ToolsTab() {
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [solunarData, setSolunarData] = useState({
    majorPeriods: ['6:15 AM - 8:15 AM', '6:45 PM - 8:45 PM'],
    minorPeriods: ['12:30 PM - 1:30 PM', '12:45 AM - 1:45 AM'],
    rating: 4,
    moonPhase: 'Waxing Crescent'
  });

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = () => {
    // Mock weather data
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
      <View style={styles.webContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Fishing Tools</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Weather</Text>
            {weather && <WeatherCard weather={weather} />}
          </View>

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
  toolsGrid: {
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
      },
      default: {
        gap: 12,
      },
    }),
  },
  toolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      web: {
        width: 'calc(50% - 16px)',
        marginHorizontal: 8,
        marginBottom: 16,
      },
      default: {},
    }),
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
});
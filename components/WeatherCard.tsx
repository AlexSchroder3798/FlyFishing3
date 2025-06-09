import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react-native';
import { WeatherCondition } from '@/types';

interface WeatherCardProps {
  weather: WeatherCondition;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return '☀️';
      case 'partly cloudy':
        return '⛅';
      case 'cloudy':
      case 'overcast':
        return '☁️';
      case 'rain':
      case 'rainy':
        return '🌧️';
      default:
        return '⛅';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.mainInfo}>
          <Text style={styles.conditionIcon}>
            {getConditionIcon(weather.condition)}
          </Text>
          <View style={styles.temperature}>
            <Text style={styles.tempValue}>{weather.temperature}°F</Text>
            <Text style={styles.condition}>{weather.condition}</Text>
          </View>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Droplets size={16} color="#3b82f6" />
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>

        <View style={styles.detailItem}>
          <Wind size={16} color="#10b981" />
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>
            {weather.windSpeed} mph {weather.windDirection}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Cloud size={16} color="#6b7280" />
          <Text style={styles.detailLabel}>Cloud Cover</Text>
          <Text style={styles.detailValue}>{weather.cloudCover}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  header: {
    marginBottom: 16,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  temperature: {
    flex: 1,
  },
  tempValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  condition: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  details: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
});
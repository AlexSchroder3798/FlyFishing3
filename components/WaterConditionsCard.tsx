import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Thermometer, Droplets, Waves, Clock } from 'lucide-react-native';
import { FishingLocation, WaterCondition } from '@/types';

interface WaterConditionsCardProps {
  location: FishingLocation;
  condition: WaterCondition;
}

export default function WaterConditionsCard({ location, condition }: WaterConditionsCardProps) {
  const getClarityColor = (clarity: string) => {
    switch (clarity) {
      case 'clear': return '#059669';
      case 'slightly_stained': return '#d97706';
      case 'stained': return '#dc2626';
      case 'muddy': return '#7f1d1d';
      default: return '#6b7280';
    }
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'low': return '#dc2626';
      case 'normal': return '#059669';
      case 'high': return '#d97706';
      case 'flood': return '#7f1d1d';
      default: return '#6b7280';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.locationName}>{location.name}</Text>
        <View style={styles.updateTime}>
          <Clock size={12} color="#6b7280" />
          <Text style={styles.updateText}>
            Updated {formatTime(condition.lastUpdated)}
          </Text>
        </View>
      </View>

      <View style={styles.conditions}>
        <View style={styles.conditionItem}>
          <Thermometer size={16} color="#2563eb" />
          <Text style={styles.conditionLabel}>Temp</Text>
          <Text style={styles.conditionValue}>{condition.temperature}°F</Text>
        </View>

        <View style={styles.conditionItem}>
          <Droplets size={16} color={getClarityColor(condition.clarity)} />
          <Text style={styles.conditionLabel}>Clarity</Text>
          <Text style={styles.conditionValue}>
            {condition.clarity.replace('_', ' ')}
          </Text>
        </View>

        <View style={styles.conditionItem}>
          <Waves size={16} color={getFlowColor(condition.flow)} />
          <Text style={styles.conditionLabel}>Flow</Text>
          <Text style={styles.conditionValue}>
            {condition.flow.charAt(0).toUpperCase() + condition.flow.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelLabel}>Water Level: {condition.level} ft</Text>
        <View style={styles.levelBar}>
          <View 
            style={[
              styles.levelFill, 
              { 
                width: `${Math.min(condition.level * 20, 100)}%`,
                backgroundColor: getFlowColor(condition.flow)
              }
            ]} 
          />
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  updateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateText: {
    marginLeft: 4,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  conditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  conditionItem: {
    alignItems: 'center',
    flex: 1,
  },
  conditionLabel: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  conditionValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginTop: 2,
    textAlign: 'center',
  },
  levelContainer: {
    marginTop: 8,
  },
  levelLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
    marginBottom: 4,
  },
  levelBar: {
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
  },
  levelFill: {
    height: '100%',
    borderRadius: 2,
  },
});
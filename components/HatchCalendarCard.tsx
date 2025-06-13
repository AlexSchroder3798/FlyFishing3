import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Clock, Zap } from 'lucide-react-native';
import { HatchEvent } from '@/types';

interface HatchCalendarCardProps {
  hatch: HatchEvent;
}

export default function HatchCalendarCard({ hatch }: HatchCalendarCardProps) {
  const isActive = () => {
    const now = new Date();
    return now >= hatch.startDate && now <= hatch.endDate;
  };

  const getDaysRemaining = () => {
    const now = new Date();
    if (now > hatch.endDate) return 'Ended';
    if (now < hatch.startDate) {
      const days = Math.ceil((hatch.startDate.time - now.getTime()) / (1000 * 60 * 60 * 24));
      return `Starts in ${days} days`;
    }
    const days = Math.ceil((hatch.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  return (
    <View style={[styles.card, isActive() && styles.activeCard]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.insectName}>{hatch.insect}</Text>
          {isActive() && (
            <View style={styles.activeBadge}>
              <Zap size={10} color="#ffffff" fill="#ffffff" />
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          )}
        </View>
        <Text style={styles.region}>{hatch.region}</Text>
      </View>

      <View style={styles.timing}>
        <View style={styles.timingItem}>
          <Calendar size={14} color="#6b7280" />
          <Text style={styles.timingText} numberOfLines={1}>{getDaysRemaining()}</Text>
        </View>
        <View style={styles.timingItem}>
          <Clock size={14} color="#6b7280" />
          <Text style={styles.timingText} numberOfLines={1}>{hatch.peakTime}</Text>
        </View>
      </View>

      <View style={styles.flies}>
        <Text style={styles.fliesLabel}>Recommended Flies:</Text>
        <View style={styles.fliesList}>
          {hatch.recommendedFlies.map((fly, index) => (
            <View key={index} style={styles.flyTag}>
              <Text style={styles.flyText}>{fly}</Text>
            </View>
          ))}
        </View>
      </View>

      {hatch.notes && (
        <Text style={styles.notes}>💡 {hatch.notes}</Text>
      )}
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
    minHeight: 180, // Ensures consistent card height
  },
  activeCard: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  insectName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginRight: 8,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginLeft: 2,
  },
  region: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  timing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  timingText: {
    marginLeft: 4,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    flexShrink: 1,
  },
  flies: {
    marginBottom: 8,
  },
  fliesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
    marginBottom: 6,
  },
  fliesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flyTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  flyText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  notes: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    fontStyle: 'italic',
    lineHeight: 14,
  },
});
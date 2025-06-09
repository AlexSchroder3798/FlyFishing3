import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Moon, Sun, Clock } from 'lucide-react-native';

interface SolunarCardProps {
  data: {
    majorPeriods: string[];
    minorPeriods: string[];
    rating: number;
    moonPhase: string;
  };
}

export default function SolunarCard({ data }: SolunarCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={styles.star}>
        {i < rating ? '★' : '☆'}
      </Text>
    ));
  };

  const getMoonEmoji = (phase: string) => {
    const phases: { [key: string]: string } = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘',
    };
    return phases[phase] || '🌙';
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Solunar Activity</Text>
        <View style={styles.rating}>
          {renderStars(data.rating)}
        </View>
      </View>

      <View style={styles.moonPhase}>
        <Text style={styles.moonEmoji}>{getMoonEmoji(data.moonPhase)}</Text>
        <Text style={styles.moonText}>{data.moonPhase}</Text>
      </View>

      <View style={styles.periods}>
        <View style={styles.periodSection}>
          <View style={styles.periodHeader}>
            <Sun size={16} color="#f59e0b" />
            <Text style={styles.periodTitle}>Major Periods</Text>
          </View>
          {data.majorPeriods.map((period, index) => (
            <View key={index} style={styles.periodItem}>
              <Clock size={12} color="#6b7280" />
              <Text style={styles.periodTime}>{period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.periodSection}>
          <View style={styles.periodHeader}>
            <Moon size={16} color="#6366f1" />
            <Text style={styles.periodTitle}>Minor Periods</Text>
          </View>
          {data.minorPeriods.map((period, index) => (
            <View key={index} style={styles.periodItem}>
              <Clock size={12} color="#6b7280" />
              <Text style={styles.periodTime}>{period}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.note}>
        💡 Fish activity is typically highest during major periods
      </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  rating: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 14,
    color: '#fbbf24',
    marginLeft: 2,
  },
  moonPhase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  moonEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  moonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
  },
  periods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  periodSection: {
    flex: 1,
    marginHorizontal: 4,
  },
  periodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodTitle: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  periodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  periodTime: {
    marginLeft: 6,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  note: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
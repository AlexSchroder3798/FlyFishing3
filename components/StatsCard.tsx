import React from 'react';
import { View, Text, StyleSheet, ReactNode, Platform } from 'react-native';

interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

export default function StatsCard({ icon, title, value }: StatsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      web: {
        width: 'calc(25% - 12px)',
        marginHorizontal: 6,
        marginBottom: 12,
      },
      default: {
        width: '48%',
        marginBottom: 12,
      },
    }),
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    textAlign: 'center',
  },
});
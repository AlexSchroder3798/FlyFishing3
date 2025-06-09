import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, Star, MapPin, Calendar } from 'lucide-react-native';
import { FishingReport } from '@/types';

interface ReportCardProps {
  report: FishingReport;
}

export default function ReportCard({ report }: ReportCardProps) {
  const getSuccessColor = (success: number) => {
    if (success >= 4) return '#22c55e';
    if (success >= 3) return '#f59e0b';
    return '#ef4444';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        color={i < rating ? '#fbbf24' : '#d1d5db'}
        fill={i < rating ? '#fbbf24' : 'transparent'}
      />
    ));
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{report.title}</Text>
        <View style={styles.successRating}>
          {renderStars(report.success)}
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {report.description}
      </Text>

      {report.photos.length > 0 && (
        <Image 
          source={{ uri: report.photos[0] }}
          style={styles.photo}
        />
      )}

      <View style={styles.conditions}>
        <Text style={styles.conditionsText}>
          🌡️ {report.conditions}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Calendar size={12} color="#6b7280" />
            <Text style={styles.metadataText}>
              {formatDate(report.timestamp)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={16} color="#6b7280" />
            <Text style={styles.actionText}>{report.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={16} color="#6b7280" />
            <Text style={styles.actionText}>{report.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  successRating: {
    flexDirection: 'row',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 18,
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  conditions: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  conditionsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadata: {
    flex: 1,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    marginLeft: 4,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
});
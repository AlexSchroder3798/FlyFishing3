import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Fish, MapPin, Calendar, Camera } from 'lucide-react-native';
import { CatchRecord } from '@/types';

interface CatchCardProps {
  catch: CatchRecord;
}

export default function CatchCard({ catch: catchRecord }: CatchCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSpeciesEmoji = (species: string) => {
    const speciesMap: { [key: string]: string } = {
      'Brown Trout': '🐟',
      'Rainbow Trout': '🌈',
      'Cutthroat Trout': '🎣',
      'Brook Trout': '🐠',
    };
    return speciesMap[species] || '🐟';
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.speciesContainer}>
          <Text style={styles.speciesEmoji}>
            {getSpeciesEmoji(catchRecord.species)}
          </Text>
          <View>
            <Text style={styles.species}>{catchRecord.species}</Text>
            <Text style={styles.size}>
              {catchRecord.length}"
              {catchRecord.weight && ` • ${catchRecord.weight} lbs`}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {catchRecord.isReleased && (
            <View style={styles.releasedBadge}>
              <Text style={styles.releasedText}>Released</Text>
            </View>
          )}
        </View>
      </View>

      {catchRecord.photos.length > 0 && (
        <Image 
          source={{ uri: catchRecord.photos[0] }}
          style={styles.photo}
        />
      )}

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#6b7280" />
          <Text style={styles.detailText}>
            {formatDate(catchRecord.timestamp)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Fish size={14} color="#6b7280" />
          <Text style={styles.detailText}>
            {catchRecord.flyPattern}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.detailText}>
            {catchRecord.weather.condition} • {catchRecord.weather.temperature}°F
          </Text>
        </View>
      </View>

      {catchRecord.notes && (
        <Text style={styles.notes} numberOfLines={2}>
          {catchRecord.notes}
        </Text>
      )}
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
    marginBottom: 12,
  },
  speciesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speciesEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  species: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  size: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  releasedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  releasedText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#16a34a',
  },
  photo: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  details: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  notes: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});
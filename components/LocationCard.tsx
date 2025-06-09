import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star, Fish, Lock } from 'lucide-react-native';
import { FishingLocation } from '@/types';

interface LocationCardProps {
  location: FishingLocation;
}

export default function LocationCard({ location }: LocationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#059669';
      case 'intermediate': return '#d97706';
      case 'advanced': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getAccessIcon = () => {
    switch (location.access) {
      case 'private': return <Lock size={14} color="#dc2626" />;
      case 'guided': return <Fish size={14} color="#d97706" />;
      default: return <MapPin size={14} color="#059669" />;
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{location.name}</Text>
          <View style={styles.rating}>
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.ratingText}>{location.rating}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            {getAccessIcon()}
            <Text style={styles.detailText}>
              {location.access.charAt(0).toUpperCase() + location.access.slice(1)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(location.difficulty) }]} />
            <Text style={styles.detailText}>
              {location.difficulty.charAt(0).toUpperCase() + location.difficulty.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.species}>
          {location.species.slice(0, 3).map((species, index) => (
            <View key={index} style={styles.speciesTag}>
              <Text style={styles.speciesText}>{species}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.regulations} numberOfLines={2}>
          {location.regulations}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
  },
  details: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  difficultyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  species: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  speciesTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  speciesText: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  regulations: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
  },
});
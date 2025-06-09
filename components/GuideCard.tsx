import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, Phone, CheckCircle } from 'lucide-react-native';
import { Guide } from '@/types';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        color={i < Math.floor(rating) ? '#fbbf24' : '#d1d5db'}
        fill={i < Math.floor(rating) ? '#fbbf24' : 'transparent'}
      />
    ));
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: guide.photos[0] }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{guide.name}</Text>
            {guide.verified && (
              <View style={styles.verifiedBadge}>
                <CheckCircle size={12} color="#22c55e" fill="#22c55e" />
              </View>
            )}
          </View>
          <View style={styles.rating}>
            {renderStars(guide.rating)}
            <Text style={styles.ratingText}>{guide.rating}</Text>
          </View>
          <View style={styles.location}>
            <MapPin size={12} color="#6b7280" />
            <Text style={styles.locationText}>{guide.location}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{guide.priceRange}</Text>
        </View>
      </View>

      <Text style={styles.bio} numberOfLines={2}>
        {guide.bio}
      </Text>

      <View style={styles.specialties}>
        <Text style={styles.specialtiesLabel}>Specialties:</Text>
        <View style={styles.specialtyTags}>
          {guide.specialties.slice(0, 3).map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.contactButton}>
        <Phone size={16} color="#2563eb" />
        <Text style={styles.contactText}>Contact Guide</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginRight: 6,
  },
  verifiedBadge: {
    marginLeft: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
  bio: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 16,
    marginBottom: 12,
  },
  specialties: {
    marginBottom: 12,
  },
  specialtiesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4b5563',
    marginBottom: 6,
  },
  specialtyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  specialtyText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  contactText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
});
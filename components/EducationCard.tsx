import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Play, Clock, BookOpen, Scissors } from 'lucide-react-native';

interface EducationContent {
  id: string;
  title: string;
  category: string;
  type: string;
  difficulty: string;
  duration: string;
  image: string;
  description: string;
}

interface EducationCardProps {
  content: EducationContent;
  onPress: (content: EducationContent) => void;
}

export default function EducationCard({ content, onPress }: EducationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = () => {
    switch (content.type) {
      case 'video': return <Play size={16} color="#ffffff" fill="#ffffff" />;
      case 'tutorial': return <Scissors size={16} color="#ffffff" />;
      default: return <BookOpen size={16} color="#ffffff" />;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(content)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: content.image }} style={styles.image} />
        <View style={styles.typeOverlay}>
          {getTypeIcon()}
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {content.title}
          </Text>
          <View style={styles.badges}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(content.difficulty) }]}>
              <Text style={styles.difficultyText}>
                {content.difficulty.charAt(0).toUpperCase() + content.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {content.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.duration}>
            <Clock size={12} color="#6b7280" />
            <Text style={styles.durationText}>{content.duration}</Text>
          </View>
          <Text style={styles.category}>
            {content.category.charAt(0).toUpperCase() + content.category.slice(1)}
          </Text>
        </View>
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
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 6,
    padding: 4,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  badges: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationText: {
    marginLeft: 4,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  category: {
    fontSize: 11,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
});
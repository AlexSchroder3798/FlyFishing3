import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Book, Video, Scissors, Banknote as Knot, Fish, CircleAlert as AlertCircle } from 'lucide-react-native';
import EducationCard from '@/components/EducationCard';

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

export default function LearnTab() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const categories = [
    { id: 'all', name: 'All', icon: Book },
    { id: 'tying', name: 'Fly Tying', icon: Scissors },
    { id: 'casting', name: 'Casting', icon: Video },
    { id: 'knots', name: 'Knots', icon: Knot },
    { id: 'species', name: 'Species', icon: Fish },
    { id: 'regulations', name: 'Regulations', icon: AlertCircle },
  ];

  const educationContent: EducationContent[] = [
    {
      id: '1',
      title: 'Woolly Bugger Fly Tying',
      category: 'tying',
      type: 'tutorial',
      difficulty: 'beginner',
      duration: '15 min',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      description: 'Learn to tie one of the most versatile and effective fly patterns.'
    },
    {
      id: '2',
      title: 'Basic Casting Techniques',
      category: 'casting',
      type: 'video',
      difficulty: 'beginner',
      duration: '22 min',
      image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
      description: 'Master the fundamentals of fly casting with proper technique.'
    },
    {
      id: '3',
      title: 'Improved Clinch Knot',
      category: 'knots',
      type: 'guide',
      difficulty: 'beginner',
      duration: '5 min',
      image: 'https://images.pexels.com/photos/931160/pexels-photo-931160.jpeg',
      description: 'The most essential knot every fly fisherman should know.'
    },
    {
      id: '4',
      title: 'Brown Trout Identification',
      category: 'species',
      type: 'guide',
      difficulty: 'beginner',
      duration: '8 min',
      image: 'https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg',
      description: 'Learn to identify brown trout and understand their behavior.'
    },
    {
      id: '5',
      title: 'Montana Fishing Regulations 2024',
      category: 'regulations',
      type: 'guide',
      difficulty: 'all',
      duration: '12 min',
      image: 'https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg',
      description: 'Current regulations, licensing requirements, and special rules.'
    },
    {
      id: '6',
      title: 'Advanced Mending Techniques',
      category: 'casting',
      type: 'video',
      difficulty: 'advanced',
      duration: '18 min',
      image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
      description: 'Control your line drift for more effective presentations.'
    }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? educationContent 
    : educationContent.filter(item => item.category === selectedCategory);

  const handleEducationCardPress = (content: EducationContent) => {
    router.push(`/learn/${content.id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.webContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Learn & Improve</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <IconComponent 
                  size={16} 
                  color={isSelected ? '#ffffff' : '#6b7280'} 
                />
                <Text style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollViewContent,
            { paddingBottom: Math.max(insets.bottom + 80, Platform.OS === 'ios' ? 100 : 88) }
          ]}
        >
          <View style={styles.section}>
            <View style={styles.cardsGrid}>
              {filteredContent.map((item) => (
                <View key={item.id} style={styles.cardWrapper}>
                  <EducationCard 
                    content={item} 
                    onPress={handleEducationCardPress}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  webContainer: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
      },
      default: {},
    }),
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#e5e7eb',
        borderRightColor: '#e5e7eb',
      },
      default: {},
    }),
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  categoriesScroll: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#e5e7eb',
        borderRightColor: '#e5e7eb',
      },
      default: {},
    }),
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderLeftColor: '#e5e7eb',
        borderRightColor: '#e5e7eb',
      },
      default: {},
    }),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  section: {
    marginBottom: 24,
  },
  cardsGrid: {
    ...Platform.select({
      web: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
      },
      default: {
        flexDirection: 'column',
      },
    }),
  },
  cardWrapper: {
    ...Platform.select({
      web: {
        width: '50%',
        paddingHorizontal: 8,
        marginBottom: 16,
      },
      default: {
        width: '100%',
      },
    }),
  },
});
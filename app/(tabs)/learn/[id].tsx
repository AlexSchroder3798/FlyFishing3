import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Play, Clock, BookOpen, Scissors, Star, Download, Share } from 'lucide-react-native';

interface EducationContent {
  id: string;
  title: string;
  category: string;
  type: string;
  difficulty: string;
  duration: string;
  image: string;
  description: string;
  fullContent?: string;
  materials?: string[];
  steps?: string[];
  tips?: string[];
  relatedContent?: string[];
}

export default function EducationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [content, setContent] = useState<EducationContent | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll use mock data based on the ID
    const mockContent: { [key: string]: EducationContent } = {
      '1': {
        id: '1',
        title: 'Woolly Bugger Fly Tying',
        category: 'tying',
        type: 'tutorial',
        difficulty: 'beginner',
        duration: '15 min',
        image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
        description: 'Learn to tie one of the most versatile and effective fly patterns.',
        fullContent: 'The Woolly Bugger is arguably the most versatile and effective fly pattern ever created. This streamer pattern imitates a wide variety of aquatic life including leeches, crayfish, baitfish, and large nymphs. Its simple design makes it perfect for beginners, while its effectiveness keeps it in every experienced angler\'s box.',
        materials: [
          'Hook: Size 6-12 streamer hook',
          'Thread: Black 6/0 or 8/0',
          'Tail: Black marabou',
          'Body: Black chenille',
          'Hackle: Black saddle hackle',
          'Weight: Lead wire (optional)'
        ],
        steps: [
          'Start thread behind the hook eye and wrap to the bend',
          'Tie in a small bunch of marabou for the tail',
          'Tie in the hackle feather by the tip at the bend',
          'Tie in the chenille and wrap thread forward',
          'Wrap chenille forward to create the body',
          'Palmer the hackle forward through the body',
          'Tie off the hackle and chenille behind the eye',
          'Whip finish and apply head cement'
        ],
        tips: [
          'Keep the marabou tail about the same length as the hook shank',
          'Don\'t over-wrap the hackle - sparse is better',
          'Vary colors: olive, brown, white, and purple are all effective',
          'Add weight for deeper water or faster currents'
        ]
      },
      '2': {
        id: '2',
        title: 'Basic Casting Techniques',
        category: 'casting',
        type: 'video',
        difficulty: 'beginner',
        duration: '22 min',
        image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
        description: 'Master the fundamentals of fly casting with proper technique.',
        fullContent: 'Proper fly casting technique is the foundation of successful fly fishing. This comprehensive guide covers the basic overhead cast, timing, and common mistakes that beginners make. With practice and proper form, you\'ll be able to present your fly accurately and delicately.',
        steps: [
          'Grip the rod with your thumb on top of the handle',
          'Start with 20-30 feet of line extended',
          'Begin the backcast with a smooth acceleration',
          'Stop the rod at 1 o\'clock position',
          'Pause to let the line straighten behind you',
          'Begin the forward cast with smooth acceleration',
          'Stop the rod at 10 o\'clock position',
          'Follow through as the line extends forward'
        ],
        tips: [
          'Practice the casting motion without line first',
          'Focus on smooth acceleration, not power',
          'Watch your backcast to ensure proper timing',
          'Keep your wrist firm and use your forearm',
          'Practice on grass before moving to water'
        ]
      },
      '3': {
        id: '3',
        title: 'Improved Clinch Knot',
        category: 'knots',
        type: 'guide',
        difficulty: 'beginner',
        duration: '5 min',
        image: 'https://images.pexels.com/photos/931160/pexels-photo-931160.jpeg',
        description: 'The most essential knot every fly fisherman should know.',
        fullContent: 'The Improved Clinch Knot is the most fundamental knot in fly fishing. It\'s strong, reliable, and easy to tie even in cold conditions or low light. This knot is perfect for attaching flies to tippet and maintains about 85% of the line strength when tied correctly.',
        steps: [
          'Thread the tippet through the eye of the hook',
          'Bring the tag end back and twist it around the standing line 5-7 times',
          'Thread the tag end through the small loop near the hook eye',
          'Thread the tag end through the large loop you just created',
          'Wet the knot with water or saliva',
          'Pull both ends to tighten the knot',
          'Trim the excess tag end close to the knot'
        ],
        tips: [
          'Always wet the knot before tightening to prevent friction damage',
          'Use 5 twists for heavy tippet, 7 for light tippet',
          'Pull steadily rather than jerking when tightening',
          'Test the knot by pulling firmly before fishing',
          'Practice tying this knot until you can do it with your eyes closed'
        ]
      },
      '4': {
        id: '4',
        title: 'Brown Trout Identification',
        category: 'species',
        type: 'guide',
        difficulty: 'beginner',
        duration: '8 min',
        image: 'https://images.pexels.com/photos/631149/pexels-photo-631149.jpeg',
        description: 'Learn to identify brown trout and understand their behavior.',
        fullContent: 'Brown trout are one of the most sought-after game fish in North America. Originally from Europe, they have adapted well to many North American waters. Understanding their identification, behavior, and habitat preferences is crucial for successful angling.',
        tips: [
          'Look for golden-brown coloration with dark spots',
          'Red and orange spots often have light halos',
          'Square or slightly forked tail',
          'Brown trout are more tolerant of warm water than other trout',
          'They often feed at night and in low-light conditions',
          'Prefer deeper pools and undercut banks during the day'
        ]
      },
      '5': {
        id: '5',
        title: 'Montana Fishing Regulations 2024',
        category: 'regulations',
        type: 'guide',
        difficulty: 'all',
        duration: '12 min',
        image: 'https://images.pexels.com/photos/1458831/pexels-photo-1458831.jpeg',
        description: 'Current regulations, licensing requirements, and special rules.',
        fullContent: 'Understanding and following fishing regulations is essential for conservation and legal compliance. Montana has specific rules for different waters, seasons, and species. Always check current regulations before fishing any water.',
        tips: [
          'Purchase a valid Montana fishing license before fishing',
          'Check for special regulations on specific waters',
          'Understand bag limits and size restrictions',
          'Know the difference between catch-and-release and harvest waters',
          'Carry your license and regulations with you while fishing',
          'Report any violations to Montana Fish, Wildlife & Parks'
        ]
      },
      '6': {
        id: '6',
        title: 'Advanced Mending Techniques',
        category: 'casting',
        type: 'video',
        difficulty: 'advanced',
        duration: '18 min',
        image: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
        description: 'Control your line drift for more effective presentations.',
        fullContent: 'Line mending is the art of controlling your fly line on the water to achieve a natural drift. Advanced mending techniques allow you to present flies more effectively in complex currents and extend your drift for longer presentations.',
        steps: [
          'Understand current patterns and how they affect your line',
          'Practice upstream mends to slow down your fly',
          'Learn downstream mends for faster presentations',
          'Master the reach cast for immediate line control',
          'Use stack mends for complex current situations',
          'Practice aerial mends during the cast'
        ],
        tips: [
          'Mend before the current grabs your line',
          'Use gentle, smooth motions to avoid disturbing the water',
          'Watch your fly, not just your line',
          'Practice mending in different current conditions',
          'Learn to read water to anticipate mending needs'
        ]
      }
    };

    if (id && mockContent[id]) {
      setContent(mockContent[id]);
    }
  }, [id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#22c55e';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = () => {
    if (!content) return <BookOpen size={20} color="#2563eb" />;
    
    switch (content.type) {
      case 'video': return <Play size={20} color="#2563eb" />;
      case 'tutorial': return <Scissors size={20} color="#2563eb" />;
      default: return <BookOpen size={20} color="#2563eb" />;
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    console.log('Share content:', content?.title);
  };

  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {content.title}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleBookmark} style={styles.actionButton}>
            <Star 
              size={20} 
              color={isBookmarked ? "#fbbf24" : "#6b7280"} 
              fill={isBookmarked ? "#fbbf24" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Share size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: content.image }} style={styles.heroImage} />
        
        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.metadata}>
              <View style={styles.metadataItem}>
                {getTypeIcon()}
                <Text style={styles.metadataText}>
                  {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                </Text>
              </View>
              <View style={styles.metadataItem}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.metadataText}>{content.duration}</Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(content.difficulty) }]}>
                <Text style={styles.difficultyText}>
                  {content.difficulty.charAt(0).toUpperCase() + content.difficulty.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.description}>{content.fullContent || content.description}</Text>

          {content.materials && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Materials Needed</Text>
              {content.materials.map((material, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>{material}</Text>
                </View>
              ))}
            </View>
          )}

          {content.steps && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Step-by-Step Instructions</Text>
              {content.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {content.tips && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pro Tips</Text>
              {content.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipIcon}>💡</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}

          {content.type === 'video' && (
            <TouchableOpacity style={styles.playButton}>
              <Play size={24} color="#ffffff" fill="#ffffff" />
              <Text style={styles.playButtonText}>Watch Video</Text>
            </TouchableOpacity>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color="#2563eb" />
              <Text style={styles.downloadButtonText}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 32,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metadataText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#2563eb',
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1e40af',
    lineHeight: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  playButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  actionButtons: {
    marginTop: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f9ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  downloadButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
  },
});
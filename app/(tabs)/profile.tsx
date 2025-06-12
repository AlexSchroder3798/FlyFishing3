import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, LogOut, CreditCard as Edit3, MapPin, Calendar, Fish, Trophy } from 'lucide-react-native';
import { getCurrentUser, signOut, getSession, onAuthStateChange } from '@/lib/database';
import { User as UserType } from '@/types';
import AuthButton from '@/components/AuthButton';

export default function ProfileTab() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        loadUserProfile();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const session = await getSession();
      
      if (session?.user) {
        setIsAuthenticated(true);
        await loadUserProfile();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error checking auth status:', err);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const userProfile = await getCurrentUser();
      setUser(userProfile);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Failed to load user profile');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Error signing out:', err);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleAuthSuccess = () => {
    setError(null);
    // User profile will be loaded via auth state change listener
  };

  const handleAuthError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.webContainer}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.webContainer}>
          <ScrollView 
            style={styles.authScrollView}
            contentContainerStyle={styles.authScrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.authContainer}>
              <View style={styles.authHeader}>
                <User size={64} color="#2563eb" />
                <Text style={styles.authTitle}>Welcome to FlyMaster</Text>
                <Text style={styles.authSubtitle}>
                  Sign in to track your catches, share reports, and connect with the fishing community
                </Text>
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <AuthButton onSuccess={handleAuthSuccess} onError={handleAuthError} />

              <View style={styles.featuresContainer}>
                <Text style={styles.featuresTitle}>What you'll get:</Text>
                <View style={styles.featuresList}>
                  <View style={styles.featureItem}>
                    <Fish size={16} color="#2563eb" />
                    <Text style={styles.featureText}>Track your catches and fishing log</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <MapPin size={16} color="#2563eb" />
                    <Text style={styles.featureText}>Discover new fishing locations</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Trophy size={16} color="#2563eb" />
                    <Text style={styles.featureText}>Share reports with the community</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.webContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {user && (
            <>
              <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                  {user.avatar ? (
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                  ) : (
                    <View style={styles.avatarPlaceholder}>
                      <User size={40} color="#6b7280" />
                    </View>
                  )}
                  <TouchableOpacity style={styles.editAvatarButton}>
                    <Edit3 size={16} color="#2563eb" />
                  </TouchableOpacity>
                </View>

                <View style={styles.userInfo}>
                  <Text style={styles.username}>{user.username || 'Anonymous Angler'}</Text>
                  <Text style={styles.email}>{user.email}</Text>
                  {user.location && (
                    <View style={styles.locationContainer}>
                      <MapPin size={14} color="#6b7280" />
                      <Text style={styles.location}>{user.location}</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Fishing Stats</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statCard}>
                    <Fish size={24} color="#2563eb" />
                    <Text style={styles.statValue}>{user.totalCatches}</Text>
                    <Text style={styles.statLabel}>Total Catches</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Trophy size={24} color="#059669" />
                    <Text style={styles.statValue}>{user.favoriteSpecies.length}</Text>
                    <Text style={styles.statLabel}>Species</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Calendar size={24} color="#dc2626" />
                    <Text style={styles.statValue}>
                      {new Date().getFullYear() - user.joinDate.getFullYear()}
                    </Text>
                    <Text style={styles.statLabel}>Years</Text>
                  </View>
                </View>
              </View>

              <View style={styles.experienceSection}>
                <Text style={styles.sectionTitle}>Experience Level</Text>
                <View style={styles.experienceCard}>
                  <Text style={styles.experienceLevel}>
                    {user.experience.charAt(0).toUpperCase() + user.experience.slice(1)}
                  </Text>
                  <Text style={styles.experienceDescription}>
                    {getExperienceDescription(user.experience)}
                  </Text>
                </View>
              </View>

              {user.favoriteSpecies.length > 0 && (
                <View style={styles.speciesSection}>
                  <Text style={styles.sectionTitle}>Favorite Species</Text>
                  <View style={styles.speciesList}>
                    {user.favoriteSpecies.map((species, index) => (
                      <View key={index} style={styles.speciesTag}>
                        <Text style={styles.speciesText}>{species}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}

          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit3 size={20} color="#2563eb" />
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Settings size={20} color="#6b7280" />
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <LogOut size={20} color="#dc2626" />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function getExperienceDescription(experience: string): string {
  switch (experience) {
    case 'beginner':
      return 'Just getting started with fly fishing';
    case 'intermediate':
      return 'Comfortable with basic techniques';
    case 'advanced':
      return 'Skilled angler with years of experience';
    case 'expert':
      return 'Master angler with extensive knowledge';
    default:
      return 'Passionate about fly fishing';
  }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: Platform.OS === 'ios' ? 85 : 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  authScrollView: {
    flex: 1,
  },
  authScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 85 : 60,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    ...Platform.select({
      web: {
        maxWidth: 500,
        alignSelf: 'center',
      },
      default: {},
    }),
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#dc2626',
    textAlign: 'center',
  },
  featuresContainer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  featuresTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4b5563',
  },
  profileSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        flexWrap: 'wrap',
        marginHorizontal: -4,
      },
      default: {},
    }),
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      web: {
        width: 'calc(33.333% - 8px)',
        marginHorizontal: 4,
        marginBottom: 8,
      },
      default: {
        flex: 1,
        marginHorizontal: 4,
      },
    }),
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  experienceSection: {
    marginBottom: 20,
  },
  experienceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  experienceLevel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2563eb',
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  speciesSection: {
    marginBottom: 20,
  },
  speciesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  speciesTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  speciesText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2563eb',
  },
  actionsSection: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  signOutButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
  },
});
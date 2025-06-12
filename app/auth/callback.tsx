import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      console.log('Starting auth callback handling...');
      
      // Set up auth state change listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state change:', event, session?.user?.id);
          
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('Auth successful:', session.user.email);
            subscription.unsubscribe();
            setIsProcessing(false);
            router.replace('/(tabs)/profile');
          } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
            console.log('Auth failed or signed out');
            subscription.unsubscribe();
            setIsProcessing(false);
            router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
          }
        }
      );

      // Check for existing session immediately
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        subscription.unsubscribe();
        setIsProcessing(false);
        router.replace('/(tabs)/profile?error=' + encodeURIComponent(error.message));
        return;
      }

      if (session?.user) {
        console.log('Found existing session:', session.user.email);
        subscription.unsubscribe();
        setIsProcessing(false);
        router.replace('/(tabs)/profile');
        return;
      }

      // Set a timeout as a fallback
      setTimeout(() => {
        if (isProcessing) {
          console.log('Auth callback timeout');
          subscription.unsubscribe();
          setIsProcessing(false);
          router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication timeout'));
        }
      }, 10000); // 10 second timeout

    } catch (error) {
      console.error('Auth callback error:', error);
      setIsProcessing(false);
      router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>Completing authentication...</Text>
      <Text style={styles.subtext}>Please wait while we sign you in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
  },
});
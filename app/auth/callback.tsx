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
      // Wait a brief moment for the Root Layout to fully mount
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if we have a session after the OAuth redirect
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        setTimeout(() => {
          router.replace('/(tabs)/profile?error=' + encodeURIComponent(error.message));
        }, 100);
        return;
      }

      if (session?.user) {
        console.log('Auth successful:', session.user.email);
        setTimeout(() => {
          router.replace('/(tabs)/profile');
        }, 100);
      } else {
        // Listen for auth state changes in case the session is still being processed
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              console.log('Auth successful via state change:', session.user.email);
              subscription.unsubscribe();
              setTimeout(() => {
                router.replace('/(tabs)/profile');
              }, 100);
            } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
              subscription.unsubscribe();
              setTimeout(() => {
                router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
              }, 100);
            }
          }
        );

        // If no session after a reasonable timeout, consider it failed
        setTimeout(() => {
          subscription.unsubscribe();
          if (isProcessing) {
            setIsProcessing(false);
            setTimeout(() => {
              router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication timeout'));
            }, 100);
          }
        }, 5000);
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      setTimeout(() => {
        router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
      }, 100);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>Completing authentication...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});
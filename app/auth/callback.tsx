import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
  // If there is an access token in the URL fragment, force Supabase to process it
  const hash = window.location.hash;
  if (hash && hash.includes('access_token')) {
    console.log('Found access token in URL hash, forcing refreshSession');
    supabase.auth.refreshSession().then(() => {
      console.log('refreshSession complete');
      handleAuthCallback();
    });
  } else {
    handleAuthCallback();
  }
}, []);


  const handleAuthCallback = async () => {
    try {
      // Set up auth state change listener immediately
      await supabase.auth.refreshSession();
      
  
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state change:', event, session?.user?.id);
          
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('Auth successful via state change:', session.user.email);
            subscription.unsubscribe();
            setIsProcessing(false);
            router.replace('/(tabs)/profile');
          } else if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
            subscription.unsubscribe();
            setIsProcessing(false);
            router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
          }
        }
      );

      // Also check for existing session immediately
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        subscription.unsubscribe();
        setIsProcessing(false);
        router.replace('/(tabs)/profile?error=' + encodeURIComponent(error.message));
        return;
      }

      if (session?.user) {
        console.log('Auth successful via existing session:', session.user.email);
        subscription.unsubscribe();
        setIsProcessing(false);
        router.replace('/(tabs)/profile');
        return;
      }

      // Set a timeout as a fallback
      setTimeout(() => {
        if (isProcessing) {
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
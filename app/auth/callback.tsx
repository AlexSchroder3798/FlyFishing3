import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    handleAuthCallback();
  }, []);

  const handleAuthCallback = async () => {
    try {
      // Extract tokens from URL parameters
      const { access_token, refresh_token, error, error_description } = params;

      if (error) {
        console.error('Auth callback error:', error, error_description);
        router.replace('/(tabs)/profile?error=' + encodeURIComponent(error_description || error));
        return;
      }

      if (access_token && refresh_token) {
        // Set the session with the tokens
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: access_token as string,
          refresh_token: refresh_token as string,
        });

        if (sessionError) {
          console.error('Session error:', sessionError);
          router.replace('/(tabs)/profile?error=' + encodeURIComponent(sessionError.message));
          return;
        }

        console.log('Auth successful:', data.user?.email);
        router.replace('/(tabs)/profile');
      } else {
        console.error('Missing tokens in callback');
        router.replace('/(tabs)/profile?error=' + encodeURIComponent('Authentication failed'));
      }
    } catch (error) {
      console.error('Auth callback error:', error);
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
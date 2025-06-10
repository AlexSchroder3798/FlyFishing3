import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { LogIn, Mail } from 'lucide-react-native';
import { signInWithGoogle, signInWithApple } from '@/lib/database';

interface AuthButtonProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function AuthButton({ onSuccess, onError }: AuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('google');
      
      await signInWithGoogle();
      onSuccess?.();
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingProvider('apple');
      
      await signInWithApple();
      onSuccess?.();
    } catch (error) {
      console.error('Apple sign-in error:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to sign in with Apple');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      >
        {loadingProvider === 'google' ? (
          <ActivityIndicator size="small\" color="#ffffff" />
        ) : (
          <Mail size={20} color="#ffffff" />
        )}
        <Text style={[styles.buttonText, styles.googleButtonText]}>
          {loadingProvider === 'google' ? 'Signing in...' : 'Continue with Google'}
        </Text>
      </TouchableOpacity>

      {Platform.OS !== 'android' && (
        <TouchableOpacity
          style={[styles.button, styles.appleButton]}
          onPress={handleAppleSignIn}
          disabled={isLoading}
        >
          {loadingProvider === 'apple' ? (
            <ActivityIndicator size="small\" color="#ffffff" />
          ) : (
            <LogIn size={20} color="#ffffff" />
          )}
          <Text style={[styles.buttonText, styles.appleButtonText]}>
            {loadingProvider === 'apple' ? 'Signing in...' : 'Continue with Apple'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 48,
  },
  googleButton: {
    backgroundColor: '#4285f4',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  googleButtonText: {
    color: '#ffffff',
  },
  appleButtonText: {
    color: '#ffffff',
  },
});
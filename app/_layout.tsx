import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform, Linking } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
// Explicit import to ensure react-native-svg is properly initialized for web
import 'react-native-svg';

declare const global: {
  ErrorUtils?: {
    setGlobalHandler: (handler: (err: any, isFatal?: boolean) => void) => void;
  };
} & typeof globalThis;

// Register a global error handler immediately so even early errors are logged
global.ErrorUtils?.setGlobalHandler((error, isFatal) => {
  console.error('Global Error:', error.message);
  console.error(error.stack);
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  // Animation values
  const introRotateY = useSharedValue(-90);
  const introOpacity = useSharedValue(0);
  const hoverScale = useSharedValue(1);
  const hoverRotation = useSharedValue(0);
  const shadowOpacity = useSharedValue(0.3);
  const shadowRadius = useSharedValue(8);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    // Add logging to diagnose font loading issues
    console.log('Font loading status:', { fontsLoaded, fontError });

    if (fontsLoaded || fontError) {
      console.log('Hiding splash screen...');
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Fallback in case fonts never finish loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Font load timeout - hiding splash screen');
      SplashScreen.hideAsync().catch(() => {});
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Trigger intro animation after a delay
    const timer = setTimeout(() => {
      introRotateY.value = withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
      introOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Animated style for the badge
  const badgeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${introRotateY.value}deg`,
        },
        {
          scale: hoverScale.value,
        },
        {
          rotate: `${hoverRotation.value}deg`,
        },
      ],
      opacity: introOpacity.value,
      shadowOpacity: shadowOpacity.value,
      shadowRadius: shadowRadius.value,
      shadowOffset: {
        width: 0,
        height: interpolate(shadowRadius.value, [8, 16], [4, 8]),
      },
      elevation: interpolate(shadowRadius.value, [8, 16], [8, 16]),
    };
  });

  // Handle mouse events for web
  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      hoverScale.value = withSequence(
        withTiming(1.1, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) })
      );
      hoverRotation.value = withSequence(
        withTiming(22, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) })
      );
      shadowOpacity.value = withTiming(0.5, { duration: 300 });
      shadowRadius.value = withTiming(16, { duration: 300 });
    }
  };

  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      shadowOpacity.value = withTiming(0.3, { duration: 300 });
      shadowRadius.value = withTiming(8, { duration: 300 });
    }
  };

  const handlePress = () => {
    if (Platform.OS === 'web') {
      window.open('https://bolt.new/', '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL('https://bolt.new/');
    }
  };

  // Temporarily bypass font loading check to diagnose black screen
  // Comment out the following lines to force app rendering
  /*
  if (!fontsLoaded && !fontError) {
    console.log('Fonts not loaded yet, showing splash screen');
    return null;
  }
  */

  // Add logging for successful render
  console.log('Rendering main app layout');

  const webProps = Platform.OS === 'web' ? {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  } : {};

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      
      {/* Bolt.new Badge */}
      <View style={styles.badgeContainer}>
        <Animated.View
          style={[styles.badgeWrapper, badgeAnimatedStyle]}
          {...webProps}
        >
          <Animated.Image
            source={{ uri: 'https://storage.bolt.army/black_circle_360x360.png' }}
            style={styles.badgeImage}
            onTouchEnd={handlePress}
            accessible={true}
            accessibilityLabel="Built with Bolt.new badge"
            accessibilityRole="button"
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgeContainer: {
    position: 'absolute',
    top: Platform.select({
      web: 16,
      default: 50, // Account for status bar on mobile
    }),
    right: 16,
    zIndex: 50,
    pointerEvents: 'box-none',
  },
  badgeWrapper: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: Platform.select({
      web: 56, // 28 * 2 for web (larger size)
      default: 40, // 20 * 2 for mobile
    }),
    backgroundColor: 'transparent',
  },
  badgeImage: {
    width: Platform.select({
      web: 112, // 28 * 4 (md:w-28 md:h-28)
      default: 80, // 20 * 4 (w-20 h-20)
    }),
    height: Platform.select({
      web: 112,
      default: 80,
    }),
    borderRadius: Platform.select({
      web: 56,
      default: 40,
    }),
  },
});
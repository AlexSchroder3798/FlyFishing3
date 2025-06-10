import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
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

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

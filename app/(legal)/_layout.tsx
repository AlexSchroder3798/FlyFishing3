import { Stack } from 'expo-router';

export default function LegalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#1f2937',
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="privacy" 
        options={{ 
          title: 'Privacy Policy',
          headerBackTitle: 'Back'
        }} 
      />
      <Stack.Screen 
        name="terms" 
        options={{ 
          title: 'Terms & Conditions',
          headerBackTitle: 'Back'
        }} 
      />
    </Stack>
  );
}
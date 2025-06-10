import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  console.log('Rendering minimal layout');
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

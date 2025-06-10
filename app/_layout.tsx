import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  console.log('Rendering minimal layout');
  
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="test" 
          component={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Test Screen Working!</Text>
            </View>
          )} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

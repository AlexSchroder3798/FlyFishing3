import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  console.log('Rendering without expo-router');
  
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Basic React Native works!</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}
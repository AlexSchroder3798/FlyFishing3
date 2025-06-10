// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // Redirect root to the tabs index
  return <Redirect href="/(tabs)" />;
}

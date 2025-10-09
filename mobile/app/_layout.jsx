import { Redirect, Stack, useSegments } from "expo-router";
import "../assets/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const {user, token, checkAuth} = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (!isAuthScreen && !isSignedIn) <Redirect href="(auth)" />;
    else if (isAuthScreen && isSignedIn) <Redirect href="(tabs)" />;
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

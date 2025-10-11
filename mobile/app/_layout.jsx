import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import "../assets/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const segments = useSegments();
  const {user, token, checkAuth} = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (segments.length === 0) return;
    const isAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    console.log("User:", user);
    console.log("Token:", token);
    console.log("Segments:", segments);
    console.log("Is Auth Screen:", isAuthScreen);
    console.log("Is Signed In:", isSignedIn);
        if (!isSignedIn && !isAuthScreen) {
      router.replace("/(auth)"); // 👈 Imperative redirect
    } else if (isSignedIn && isAuthScreen) {
      router.replace("/(tabs)"); // 👈 Redirect authenticated user
    }
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

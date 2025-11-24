
import "react-native-reanimated";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { AssessmentProvider } from "@/contexts/AssessmentContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)", // Ensure any route can link back to `/`
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "🔌 You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded) {
    return null;
  }

  const CustomDefaultTheme: Theme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "rgb(13, 149, 255)", // Clarity Blue
      background: "rgb(255, 253, 249)", // Off White
      card: "rgb(255, 255, 255)", // White cards
      text: "rgb(31, 43, 115)", // Focus Blue
      border: "rgb(227, 216, 255)", // Reliable Lilac
      notification: "rgb(255, 129, 12)", // Beacon Orange
    },
  };

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      primary: "rgb(13, 149, 255)", // Clarity Blue
      background: "rgb(31, 43, 115)", // Focus Blue (darker)
      card: "rgb(44, 56, 125)", // Darker card
      text: "rgb(255, 253, 249)", // Off White
      border: "rgb(227, 216, 255)", // Reliable Lilac
      notification: "rgb(255, 129, 12)", // Beacon Orange
    },
  };
  
  return (
    <>
      <StatusBar style="auto" animated />
        <ThemeProvider
          value={colorScheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
        >
          <WidgetProvider>
            <AssessmentProvider>
              <GestureHandlerRootView>
              <Stack>
                {/* Main app with tabs */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                {/* Assessment screens */}
                <Stack.Screen 
                  name="deal-details" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="assessment/credibility" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="assessment/capability" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="assessment/commitment" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="assessment/control" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="results" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />
                <Stack.Screen 
                  name="insights" 
                  options={{ 
                    headerShown: false,
                    presentation: 'card',
                  }} 
                />

                {/* Modal Demo Screens */}
                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                    title: "Standard Modal",
                  }}
                />
                <Stack.Screen
                  name="formsheet"
                  options={{
                    presentation: "formSheet",
                    title: "Form Sheet Modal",
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.5, 0.8, 1.0],
                    sheetCornerRadius: 20,
                  }}
                />
                <Stack.Screen
                  name="transparent-modal"
                  options={{
                    presentation: "transparentModal",
                    headerShown: false,
                  }}
                />
              </Stack>
              <SystemBars style={"auto"} />
              </GestureHandlerRootView>
            </AssessmentProvider>
          </WidgetProvider>
        </ThemeProvider>
    </>
  );
}

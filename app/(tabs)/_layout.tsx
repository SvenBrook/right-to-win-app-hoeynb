
import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  // For this app, we don't need a tab bar since it's a linear flow
  // Just use a simple stack navigation
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen key="home" name="(home)" />
    </Stack>
  );
}

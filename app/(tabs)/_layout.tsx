import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '@/components/AuthContext';
import { ThemedView } from '@/components/ThemedView';

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => {
            return <IconSymbol size={28} name="house.fill" color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          //title: 'Pinjam/Kembalikan',
          title: "",
          tabBarIcon: ({ color }) => {
            return <ThemedView style={{
              width: 80,
              height: 80,
              borderWidth: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              marginBottom: 25,
            }}>
              <IconSymbol size={80} name="camera.circle" color={color} />
            </ThemedView>
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => {
            return <IconSymbol size={28} name="person.fill" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}

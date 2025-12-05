import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../hooks/useTheme";

// Simple icon components
function TabIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, string> = {
    home: "🏠",
    reports: "📊",
    disputes: "⚡",
    chat: "💬",
    profile: "👤",
  };
  return <Text style={{ fontSize: 24 }}>{icons[name] || "●"}</Text>;
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => <TabIcon name="reports" color={color} />,
        }}
      />
      <Tabs.Screen
        name="disputes"
        options={{
          title: "Disputes",
          tabBarIcon: ({ color }) => <TabIcon name="disputes" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI Chat",
          tabBarIcon: ({ color }) => <TabIcon name="chat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabIcon name="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}

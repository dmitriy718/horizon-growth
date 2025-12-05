import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../hooks/useTheme";

export default function ProfileScreen() {
  const { colors } = useTheme();

  const menuItems = [
    { icon: "👤", title: "Account Settings", subtitle: "Manage your profile" },
    { icon: "💳", title: "Subscription", subtitle: "Premier Plan - Active" },
    { icon: "📄", title: "Documents", subtitle: "View uploaded documents" },
    { icon: "🔔", title: "Notifications", subtitle: "Manage alerts" },
    { icon: "🔒", title: "Security", subtitle: "Password & biometrics" },
    { icon: "❓", title: "Help & Support", subtitle: "FAQs and contact" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            john.doe@email.com
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>⭐ Premier Member</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.surface }]}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuSubtitle, { color: colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={{ color: colors.muted }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#92400E",
    fontWeight: "600",
    fontSize: 13,
  },
  menu: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 24,
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
});


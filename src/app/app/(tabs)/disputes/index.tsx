import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../hooks/useTheme";

export default function DisputesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Disputes</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Manage and track your credit disputes
        </Text>
        
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            ⚡ Coming Soon
          </Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            AI-powered dispute creation wizard with automated letter generation
            and real-time tracking.
          </Text>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});


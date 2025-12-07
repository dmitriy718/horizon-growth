import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../hooks/useTheme";

export default function ChatScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>AI Assistant</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Get instant help with credit questions
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            💬 Coming Soon
          </Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            AI-powered chat assistant to help analyze your credit, answer
            questions, and guide you through disputes.
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

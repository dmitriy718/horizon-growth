import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            {greeting()}! 👋
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Here&apos;s your credit overview
          </Text>
        </View>

        {/* Score Card */}
        <View style={[styles.scoreCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.scoreLabel}>Your Credit Score</Text>
          <Text style={styles.scoreValue}>645</Text>
          <Text style={styles.scoreRating}>FAIR</Text>
          <View style={styles.scoreChange}>
            <Text style={styles.scoreChangeText}>↑ +23 this month&apos;s</Text>
          </View>
          <View style={styles.bureauRow}>
            <View style={styles.bureauItem}>
              <Text style={styles.bureauLabel}>Experian</Text>
              <Text style={styles.bureauScore}>642</Text>
            </View>
            <View style={styles.bureauItem}>
              <Text style={styles.bureauLabel}>Equifax</Text>
              <Text style={styles.bureauScore}>648</Text>
            </View>
            <View style={styles.bureauItem}>
              <Text style={styles.bureauLabel}>TransUnion</Text>
              <Text style={styles.bureauScore}>645</Text>
            </View>
          </View>
        </View>

        {/* Active Disputes */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Active Disputes
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            3 of 5 in progress
          </Text>

          {/* Dispute Items */}
          <View style={styles.disputeList}>
            <View style={styles.disputeItem}>
              <Text style={styles.disputeIcon}>✅</Text>
              <View style={styles.disputeInfo}>
                <Text style={[styles.disputeName, { color: colors.text }]}>
                  Capital One
                </Text>
                <Text style={[styles.disputeStatus, { color: colors.success }]}>
                  DELETED
                </Text>
              </View>
            </View>
            <View style={styles.disputeItem}>
              <Text style={styles.disputeIcon}>⏳</Text>
              <View style={styles.disputeInfo}>
                <Text style={[styles.disputeName, { color: colors.text }]}>
                  Collections Account
                </Text>
                <Text style={[styles.disputeStatus, { color: colors.warning }]}>
                  Day 22 of 45
                </Text>
              </View>
            </View>
            <View style={styles.disputeItem}>
              <Text style={styles.disputeIcon}>⏳</Text>
              <View style={styles.disputeInfo}>
                <Text style={[styles.disputeName, { color: colors.text }]}>
                  Late Payment
                </Text>
                <Text style={[styles.disputeStatus, { color: colors.warning }]}>
                  Day 8 of 45
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Insight */}
        <View style={[styles.card, styles.insightCard]}>
          <Text style={styles.insightIcon}>💡</Text>
          <Text style={styles.insightTitle}>AI Insight</Text>
          <Text style={styles.insightText}>
            Great progress! Your utilization dropped to 28%. Keep it under 30%
            for optimal score impact.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  scoreCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  scoreLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  scoreValue: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: 8,
  },
  scoreRating: {
    color: "#E8A838",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
  },
  scoreChange: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreChangeText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  bureauRow: {
    flexDirection: "row",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    width: "100%",
    justifyContent: "space-around",
  },
  bureauItem: {
    alignItems: "center",
  },
  bureauLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
  },
  bureauScore: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1E3A5F",
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
  },
  disputeList: {
    marginTop: 16,
  },
  disputeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  disputeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  disputeInfo: {
    flex: 1,
  },
  disputeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  disputeStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  insightCard: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
  },
  insightIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  insightText: {
    color: "#78350F",
    fontSize: 14,
    lineHeight: 20,
  },
});

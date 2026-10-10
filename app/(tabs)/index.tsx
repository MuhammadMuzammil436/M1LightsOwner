import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../../theme/tokens";

const metrics = [
  {
    label: "Today's sales",
    value: "Rs 24,850",
    note: "+12.5% vs yesterday",
    icon: "trending-up" as const,
  },
  {
    label: "Orders today",
    value: "18",
    note: "6 need processing",
    icon: "receipt-outline" as const,
  },
  {
    label: "Pending payments",
    value: "Rs 12,400",
    note: "4 orders unpaid",
    icon: "wallet-outline" as const,
  },
  {
    label: "Low stock items",
    value: "7",
    note: "Restock recommended",
    icon: "alert-circle-outline" as const,
  },
];

const sampleOrders = [
  {
    id: "#RG-1048",
    customer: "Ayesha Khan",
    total: "Rs 4,500",
    status: "Processing",
  },
  {
    id: "#RG-1047",
    customer: "Hamza Ali",
    total: "Rs 2,850",
    status: "Pending",
  },
  {
    id: "#RG-1046",
    customer: "Sara Ahmed",
    total: "Rs 6,200",
    status: "Shipped",
  },
];

const orderCounts = [
  { label: "Pending", count: 6, color: "#F59E0B" },
  { label: "Processing", count: 8, color: "#3B82F6" },
  { label: "Shipped", count: 4, color: "#8B5CF6" },
];

export default function HomeScreen() {
  const [showSampleNotice, setShowSampleNotice] = useState(true);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>R</Text>
            </View>
            <View>
              <Text style={styles.brandName}>RideGlow</Text>
              <Text style={styles.brandSubtitle}>OWNER CONSOLE</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={styles.notificationButton}
            onPress={() =>
              alert("Notifications will be connected in a later step.")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={colors.text}
            />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.greeting}>
          <View>
            <Text style={styles.eyebrow}>YOUR BUSINESS AT A GLANCE</Text>
            <Text style={styles.heading}>Good morning 👋</Text>
            <Text style={styles.muted}>Here's what's happening today.</Text>
          </View>
        </View>

        {showSampleNotice && (
          <View style={styles.notice}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color="#7A5A00"
            />
            <Text style={styles.noticeText}>
              Demo data — these figures are examples, not live business records.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss demo notice"
              onPress={() => setShowSampleNotice(false)}
            >
              <Ionicons name="close" size={19} color="#7A5A00" />
            </Pressable>
          </View>
        )}

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Business overview</Text>
          <Text style={styles.period}>TODAY</Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <View style={styles.metricTop}>
                <View style={styles.metricIcon}>
                  <Ionicons
                    name={metric.icon}
                    size={20}
                    color={colors.neutral}
                  />
                </View>
              </View>
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricNote}>{metric.note}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Order status</Text>
          <Text style={styles.totalOrders}>18 total</Text>
        </View>

        <View style={styles.orderStatusCard}>
          {orderCounts.map((item) => (
            <View key={item.label} style={styles.statusRow}>
              <View style={styles.statusLeft}>
                <View
                  style={[styles.statusDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.statusLabel}>{item.label}</Text>
              </View>
              <Text style={styles.statusCount}>{item.count}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Recent orders</Text>
          <Text style={styles.demoLabel}>SAMPLE</Text>
        </View>

        <View style={styles.recentCard}>
          {sampleOrders.map((order, index) => (
            <View
              key={order.id}
              style={[
                styles.orderRow,
                index !== sampleOrders.length - 1 && styles.orderDivider,
              ]}
            >
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.customer}>{order.customer}</Text>
                <Text style={styles.orderTotal}>{order.total}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  order.status === "Pending" && styles.pendingBadge,
                  order.status === "Processing" && styles.processingBadge,
                  order.status === "Shipped" && styles.shippedBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    order.status === "Pending" && styles.pendingText,
                    order.status === "Processing" && styles.processingText,
                    order.status === "Shipped" && styles.shippedText,
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>RideGlow Owner · Dashboard preview</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: colors.neutral,
    fontSize: 25,
    fontWeight: "900",
  },
  brandName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  brandSubtitle: {
    marginTop: 2,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: colors.textMuted,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
  },
  greeting: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: "700",
    color: colors.textMuted,
    marginBottom: 8,
  },
  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.7,
  },
  muted: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textMuted,
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF4CC",
    padding: 12,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B5100",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },
  period: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.textMuted,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: spacing.xl,
  },
  metricCard: {
    width: "48%",
    flexGrow: 1,
    flexBasis: "44%",
    minHeight: 152,
    padding: 14,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: colors.text,
  },
  metricNote: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
    marginTop: 6,
  },
  totalOrders: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
  },
  orderStatusCard: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  statusRow: {
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  statusLabel: {
    fontSize: 13,
    color: colors.text,
  },
  statusCount: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },
  demoLabel: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: "800",
    color: colors.textMuted,
  },
  recentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: 16,
  },
  orderDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderInfo: {
    flex: 1,
    gap: 4,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },
  customer: {
    fontSize: 12,
    color: colors.textMuted,
  },
  orderTotal: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  statusBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pendingBadge: { backgroundColor: "#FFF2D7" },
  processingBadge: { backgroundColor: "#DBEAFE" },
  shippedBadge: { backgroundColor: "#EDE9FE" },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  pendingText: { color: "#92400E" },
  processingText: { color: "#1D4ED8" },
  shippedText: { color: "#6D28D9" },
  footer: {
    marginTop: spacing.xxl,
    textAlign: "center",
    fontSize: 11,
    color: colors.textMuted,
  },
});

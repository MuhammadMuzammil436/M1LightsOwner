import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../../theme/tokens";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

type Order = {
  id: string;
  customer: string;
  phone: string;
  date: string;
  total: number;
  payment: string;
  status: OrderStatus;
  items: number;
  address: string;
};

const demoOrders: Order[] = [
  {
    id: "RG-1048",
    customer: "Ayesha Khan",
    phone: "03XX-XXX-1021",
    date: "Today, 10:42 AM",
    total: 4500,
    payment: "Cash on Delivery",
    status: "Processing",
    items: 2,
    address: "Lahore, Punjab",
  },
  {
    id: "RG-1047",
    customer: "Hamza Ali",
    phone: "03XX-XXX-3045",
    date: "Today, 9:18 AM",
    total: 2850,
    payment: "Bank Transfer",
    status: "Pending",
    items: 1,
    address: "Karachi, Sindh",
  },
  {
    id: "RG-1046",
    customer: "Sara Ahmed",
    phone: "03XX-XXX-7812",
    date: "Yesterday, 5:30 PM",
    total: 6200,
    payment: "Cash on Delivery",
    status: "Shipped",
    items: 3,
    address: "Islamabad",
  },
  {
    id: "RG-1045",
    customer: "Usman Raza",
    phone: "03XX-XXX-6621",
    date: "Yesterday, 2:15 PM",
    total: 1950,
    payment: "Paid online",
    status: "Delivered",
    items: 1,
    address: "Faisalabad, Punjab",
  },
  {
    id: "RG-1044",
    customer: "Mariam Noor",
    phone: "03XX-XXX-9980",
    date: "10 Oct, 11:20 AM",
    total: 3750,
    payment: "Cash on Delivery",
    status: "Pending",
    items: 2,
    address: "Rawalpindi, Punjab",
  },
  {
    id: "RG-1043",
    customer: "Bilal Ahmed",
    phone: "03XX-XXX-1276",
    date: "9 Oct, 4:45 PM",
    total: 8200,
    payment: "Paid online",
    status: "Delivered",
    items: 4,
    address: "Multan, Punjab",
  },
];

const filters = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
] as const;

type Filter = (typeof filters)[number];

function formatPKR(amount: number) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

function statusColors(status: OrderStatus) {
  switch (status) {
    case "Pending":
      return { background: "#FFF2D7", text: "#92400E" };
    case "Processing":
      return { background: "#DBEAFE", text: "#1D4ED8" };
    case "Shipped":
      return { background: "#EDE9FE", text: "#6D28D9" };
    case "Delivered":
      return { background: "#DCFCE7", text: "#166534" };
  }
}

export default function OrdersScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoOrders.filter((order) => {
      const matchesFilter = filter === "All" || order.status === filter;

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  if (selectedOrder) {
    const badge = statusColors(selectedOrder.status);

    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => setSelectedOrder(null)}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
            <Text style={styles.backText}>Back to orders</Text>
          </Pressable>

          <Text style={styles.eyebrow}>ORDER DETAILS</Text>
          <Text style={styles.detailTitle}>#{selectedOrder.id}</Text>
          <View style={[styles.badge, { backgroundColor: badge.background }]}>
            <Text style={[styles.badgeText, { color: badge.text }]}>
              {selectedOrder.status}
            </Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.cardHeading}>Customer</Text>
            <Text style={styles.detailValue}>{selectedOrder.customer}</Text>
            <Text style={styles.detailMuted}>{selectedOrder.phone}</Text>
            <View style={styles.separator} />

            <Text style={styles.cardHeading}>Delivery address</Text>
            <Text style={styles.detailValue}>{selectedOrder.address}</Text>
            <View style={styles.separator} />

            <Text style={styles.cardHeading}>Order summary</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailMuted}>Items</Text>
              <Text style={styles.detailValue}>{selectedOrder.items}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailMuted}>Payment method</Text>
              <Text style={styles.detailValue}>{selectedOrder.payment}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailMuted}>Order date</Text>
              <Text style={styles.detailValue}>{selectedOrder.date}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.totalLabel}>Order total</Text>
              <Text style={styles.totalValue}>
                {formatPKR(selectedOrder.total)}
              </Text>
            </View>
          </View>

          <View style={styles.demoNotice}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color="#7A5A00"
            />
            <Text style={styles.demoText}>
              Sample order only. Status changes, refunds, and payment actions
              are not connected yet.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>ORDER MANAGEMENT</Text>
            <Text style={styles.title}>Orders</Text>
            <Text style={styles.subtitle}>
              Track and manage customer orders.
            </Text>
          </View>
          <View style={styles.countCircle}>
            <Text style={styles.countNumber}>{demoOrders.length}</Text>
          </View>
        </View>

        <View style={styles.demoNotice}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color="#7A5A00"
          />
          <Text style={styles.demoText}>
            Showing sample orders, not live store data.
          </Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search order or customer"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textMuted}
              />
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        >
          {filters.map((item) => {
            const active = filter === item;

            return (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text
                  style={[styles.filterText, active && styles.filterTextActive]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listHeading}>
          <Text style={styles.sectionTitle}>
            {filter === "All" ? "All orders" : `${filter} orders`}
          </Text>
          <Text style={styles.resultCount}>{visibleOrders.length} found</Text>
        </View>

        {visibleOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="file-tray-outline"
              size={34}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptyText}>
              Try a different search or status filter.
            </Text>
            <Pressable
              style={styles.resetButton}
              onPress={() => {
                setSearch("");
                setFilter("All");
              }}
            >
              <Text style={styles.resetButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        ) : (
          visibleOrders.map((order) => {
            const badge = statusColors(order.status);

            return (
              <Pressable
                key={order.id}
                style={styles.orderCard}
                onPress={() => setSelectedOrder(order)}
              >
                <View style={styles.orderTop}>
                  <View style={styles.orderIdBlock}>
                    <Text style={styles.orderId}>#{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      { backgroundColor: badge.background },
                    ]}
                  >
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.customerRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {order.customer.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.customerBlock}>
                    <Text style={styles.customerName}>{order.customer}</Text>
                    <Text style={styles.orderMeta}>
                      {order.items} {order.items === 1 ? "item" : "items"}
                      {" · "}
                      {order.payment}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={19}
                    color={colors.textMuted}
                  />
                </View>

                <View style={styles.orderBottom}>
                  <Text style={styles.totalCaption}>Order total</Text>
                  <Text style={styles.orderTotal}>
                    {formatPKR(order.total)}
                  </Text>
                </View>
              </Pressable>
            );
          })
        )}

        <Text style={styles.footer}>RideGlow Owner · Sample data</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.textMuted,
    marginBottom: 7,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 5,
  },
  countCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  countNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.neutral,
  },
  demoNotice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#FFF4CC",
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  demoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B5100",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },
  filterList: {
    gap: 8,
    paddingBottom: spacing.lg,
  },
  filterChip: {
    borderRadius: radius.pill,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipActive: {
    backgroundColor: colors.neutral,
    borderColor: colors.neutral,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },
  resultCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  orderCard: {
    padding: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: 12,
  },
  orderTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  orderIdBlock: {
    flex: 1,
    gap: 5,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },
  orderDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.neutral,
  },
  customerBlock: {
    flex: 1,
    gap: 4,
  },
  customerName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  orderMeta: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },
  orderBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 14,
  },
  totalCaption: {
    fontSize: 12,
    color: colors.textMuted,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginTop: 12,
  },
  emptyText: {
    fontSize: 12,
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 6,
  },
  resetButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
  },
  resetButtonText: {
    color: colors.neutral,
    fontWeight: "800",
    fontSize: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginBottom: 28,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 20,
  },
  cardHeading: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: colors.textMuted,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  detailMuted: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    color: colors.textMuted,
  },
});

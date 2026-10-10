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

type StockStatus = "In stock" | "Low stock" | "Out of stock";
type Filter = "All" | StockStatus;

type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reorderLevel: number;
  location: string;
};

type Movement = {
  id: string;
  product: string;
  type: "Stock received" | "Order fulfilled" | "Manual adjustment";
  quantity: number;
  date: string;
};

const demoInventory: InventoryItem[] = [
  {
    id: "P-001",
    name: "Glow Serum",
    sku: "RG-SER-001",
    quantity: 42,
    reorderLevel: 10,
    location: "Main warehouse",
  },
  {
    id: "P-002",
    name: "Radiance Face Wash",
    sku: "RG-FW-002",
    quantity: 6,
    reorderLevel: 10,
    location: "Main warehouse",
  },
  {
    id: "P-003",
    name: "Silk Hair Oil",
    sku: "RG-HO-003",
    quantity: 0,
    reorderLevel: 8,
    location: "Main warehouse",
  },
  {
    id: "P-004",
    name: "Hydrating Moisturizer",
    sku: "RG-MO-004",
    quantity: 28,
    reorderLevel: 10,
    location: "Main warehouse",
  },
  {
    id: "P-005",
    name: "Daily Hair Shampoo",
    sku: "RG-SH-005",
    quantity: 3,
    reorderLevel: 8,
    location: "Main warehouse",
  },
  {
    id: "P-006",
    name: "Body Lotion",
    sku: "RG-BL-006",
    quantity: 19,
    reorderLevel: 8,
    location: "Main warehouse",
  },
];

const demoMovements: Movement[] = [
  {
    id: "MOV-205",
    product: "Glow Serum",
    type: "Stock received",
    quantity: 20,
    date: "Today, 9:15 AM",
  },
  {
    id: "MOV-204",
    product: "Radiance Face Wash",
    type: "Order fulfilled",
    quantity: -2,
    date: "Today, 8:42 AM",
  },
  {
    id: "MOV-203",
    product: "Body Lotion",
    type: "Manual adjustment",
    quantity: -1,
    date: "Yesterday, 4:10 PM",
  },
  {
    id: "MOV-202",
    product: "Hydrating Moisturizer",
    type: "Stock received",
    quantity: 12,
    date: "Yesterday, 11:30 AM",
  },
];

const filters: Filter[] = ["All", "In stock", "Low stock", "Out of stock"];

function getStatus(item: InventoryItem): StockStatus {
  if (item.quantity === 0) return "Out of stock";
  if (item.quantity <= item.reorderLevel) return "Low stock";
  return "In stock";
}

function getStatusColors(status: StockStatus) {
  switch (status) {
    case "Out of stock":
      return { background: "#FEE2E2", text: "#B91C1C" };
    case "Low stock":
      return { background: "#FFF2D7", text: "#92400E" };
    case "In stock":
      return { background: "#DCFCE7", text: "#166534" };
  }
}

export default function InventoryScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const totalUnits = demoInventory.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const lowStockCount = demoInventory.filter(
    (item) => getStatus(item) === "Low stock",
  ).length;

  const outOfStockCount = demoInventory.filter(
    (item) => getStatus(item) === "Out of stock",
  ).length;

  const visibleInventory = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoInventory.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query);

      const matchesFilter = filter === "All" || getStatus(item) === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>STOCK CONTROL</Text>
            <Text style={styles.title}>Inventory</Text>
            <Text style={styles.subtitle}>
              Know what you have and what needs restocking.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="layers-outline" size={25} color={colors.neutral} />
          </View>
        </View>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color="#7A5A00"
          />
          <Text style={styles.noticeText}>
            Demo inventory — quantities are examples, not live stock.
          </Text>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total available units</Text>
          <Text style={styles.totalValue}>
            {totalUnits.toLocaleString("en-PK")}
          </Text>
          <View style={styles.totalFoot}>
            <Ionicons name="cube-outline" size={17} color={colors.neutral} />
            <Text style={styles.totalFootText}>
              Across {demoInventory.length} sample products
            </Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#166534"
              />
            </View>
            <Text style={styles.summaryLabel}>Healthy stock</Text>
            <Text style={styles.summaryValue}>
              {
                demoInventory.filter((item) => getStatus(item) === "In stock")
                  .length
              }
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons name="alert-circle-outline" size={19} color="#92400E" />
            </View>
            <Text style={styles.summaryLabel}>Low stock</Text>
            <Text style={styles.summaryValue}>{lowStockCount}</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons name="close-circle-outline" size={19} color="#B91C1C" />
            </View>
            <Text style={styles.summaryLabel}>Out of stock</Text>
            <Text style={styles.summaryValue}>{outOfStockCount}</Text>
          </View>
        </View>

        {lowStockCount + outOfStockCount > 0 && (
          <View style={styles.alertCard}>
            <View style={styles.alertIcon}>
              <Ionicons name="warning-outline" size={22} color="#92400E" />
            </View>
            <View style={styles.alertCopy}>
              <Text style={styles.alertTitle}>Restock attention needed</Text>
              <Text style={styles.alertText}>
                {lowStockCount + outOfStockCount} products are at or below their
                reorder levels.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Stock levels</Text>
          <Text style={styles.sectionMeta}>
            {visibleInventory.length} products
          </Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search product or SKU"
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
          contentContainerStyle={styles.filters}
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

        {visibleInventory.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="file-tray-outline"
              size={32}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No stock items found</Text>
            <Text style={styles.emptyText}>
              Try another search or stock filter.
            </Text>
            <Pressable
              style={styles.clearButton}
              onPress={() => {
                setSearch("");
                setFilter("All");
              }}
            >
              <Text style={styles.clearButtonText}>Clear filters</Text>
            </Pressable>
          </View>
        ) : (
          visibleInventory.map((item) => {
            const status = getStatus(item);
            const badge = getStatusColors(status);

            return (
              <View key={item.id} style={styles.stockCard}>
                <View style={styles.stockTop}>
                  <View style={styles.stockProductIcon}>
                    <Ionicons
                      name="cube-outline"
                      size={23}
                      color={colors.neutral}
                    />
                  </View>

                  <View style={styles.stockProductInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productSku}>{item.sku}</Text>
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: badge.background },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: badge.text }]}>
                      {status}
                    </Text>
                  </View>
                </View>

                <View style={styles.stockBottom}>
                  <View>
                    <Text style={styles.quantityLabel}>Available</Text>
                    <Text style={styles.quantityValue}>
                      {item.quantity} units
                    </Text>
                  </View>

                  <View style={styles.reorderInfo}>
                    <Text style={styles.quantityLabel}>Reorder level</Text>
                    <Text style={styles.reorderValue}>
                      {item.reorderLevel} units
                    </Text>
                  </View>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${
                          item.quantity === 0
                            ? 0
                            : Math.min(
                                100,
                                (item.quantity /
                                  Math.max(item.reorderLevel * 3, 1)) *
                                  100,
                              )
                        }%`,
                        backgroundColor:
                          status === "Out of stock"
                            ? "#DC2626"
                            : status === "Low stock"
                              ? "#F59E0B"
                              : "#65A30D",
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent stock movements</Text>
          <Text style={styles.sectionMeta}>Latest 4</Text>
        </View>

        <View style={styles.ledgerCard}>
          {demoMovements.map((movement, index) => {
            const isIncoming = movement.quantity > 0;

            return (
              <View
                key={movement.id}
                style={[
                  styles.movementRow,
                  index !== demoMovements.length - 1 && styles.movementDivider,
                ]}
              >
                <View
                  style={[
                    styles.movementIcon,
                    {
                      backgroundColor: isIncoming ? "#DCFCE7" : "#FEE2E2",
                    },
                  ]}
                >
                  <Ionicons
                    name={isIncoming ? "arrow-down" : "arrow-up"}
                    size={18}
                    color={isIncoming ? "#166534" : "#B91C1C"}
                  />
                </View>

                <View style={styles.movementInfo}>
                  <Text style={styles.movementProduct}>{movement.product}</Text>
                  <Text style={styles.movementType}>{movement.type}</Text>
                  <Text style={styles.movementDate}>{movement.date}</Text>
                </View>

                <Text
                  style={[
                    styles.movementQuantity,
                    { color: isIncoming ? "#166534" : "#B91C1C" },
                  ]}
                >
                  {isIncoming ? "+" : ""}
                  {movement.quantity}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.footer}>
          RideGlow Owner · Sample inventory ledger
        </Text>
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
    gap: 12,
    marginBottom: spacing.lg,
  },
  headerCopy: {
    flex: 1,
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
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 5,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#FFF4CC",
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B5100",
  },
  totalCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 20,
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#35431A",
  },
  totalValue: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: -1,
    color: colors.neutral,
    marginTop: 8,
  },
  totalFoot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },
  totalFootText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#35431A",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  summaryIcon: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginTop: 4,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF4CC",
    borderWidth: 1,
    borderColor: "#F4D77B",
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: spacing.xl,
  },
  alertIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE8A3",
  },
  alertCopy: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#6B5100",
  },
  alertText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#7A5A00",
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },
  sectionMeta: {
    fontSize: 11,
    color: colors.textMuted,
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
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    paddingVertical: 0,
  },
  filters: {
    gap: 8,
    paddingBottom: spacing.lg,
  },
  filterChip: {
    borderRadius: radius.pill,
    paddingHorizontal: 13,
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
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  stockCard: {
    padding: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: 10,
  },
  stockTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stockProductIcon: {
    width: 44,
    height: 46,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  stockProductInfo: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },
  productSku: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
  locationText: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "800",
  },
  stockBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
    marginBottom: 10,
  },
  quantityLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },
  quantityValue: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
    marginTop: 4,
  },
  reorderInfo: {
    alignItems: "flex-end",
  },
  reorderValue: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
    marginTop: 4,
  },
  progressTrack: {
    height: 5,
    backgroundColor: "#EDF0E9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  emptyState: {
    alignItems: "center",
    padding: 28,
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
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 6,
  },
  clearButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
  },
  clearButtonText: {
    color: colors.neutral,
    fontWeight: "800",
    fontSize: 12,
  },
  ledgerCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
  },
  movementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
  },
  movementDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  movementIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  movementInfo: {
    flex: 1,
    gap: 3,
  },
  movementProduct: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text,
  },
  movementType: {
    fontSize: 10,
    color: colors.textMuted,
  },
  movementDate: {
    fontSize: 9,
    color: colors.textMuted,
  },
  movementQuantity: {
    fontSize: 14,
    fontWeight: "800",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    color: colors.textMuted,
  },
});

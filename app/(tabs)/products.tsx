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

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  description: string;
};

type Filter = "All" | "In stock" | "Low stock" | "Out of stock";

const demoProducts: Product[] = [
  {
    id: "P-001",
    name: "Glow Serum",
    sku: "RG-SER-001",
    category: "Skincare",
    price: 1850,
    stock: 42,
    active: true,
    description: "Daily skincare serum. This is example catalog data.",
  },
  {
    id: "P-002",
    name: "Radiance Face Wash",
    sku: "RG-FW-002",
    category: "Skincare",
    price: 950,
    stock: 6,
    active: true,
    description: "Gentle face wash. This is example catalog data.",
  },
  {
    id: "P-003",
    name: "Silk Hair Oil",
    sku: "RG-HO-003",
    category: "Haircare",
    price: 1250,
    stock: 0,
    active: true,
    description: "Hair oil product. This is example catalog data.",
  },
  {
    id: "P-004",
    name: "Hydrating Moisturizer",
    sku: "RG-MO-004",
    category: "Skincare",
    price: 2200,
    stock: 28,
    active: true,
    description: "Hydrating moisturizer. This is example catalog data.",
  },
  {
    id: "P-005",
    name: "Daily Hair Shampoo",
    sku: "RG-SH-005",
    category: "Haircare",
    price: 1100,
    stock: 3,
    active: false,
    description: "Shampoo product. This is example catalog data.",
  },
  {
    id: "P-006",
    name: "Body Lotion",
    sku: "RG-BL-006",
    category: "Bodycare",
    price: 1450,
    stock: 19,
    active: true,
    description: "Body lotion product. This is example catalog data.",
  },
];

const filters: Filter[] = ["All", "In stock", "Low stock", "Out of stock"];

function money(value: number) {
  return `Rs ${value.toLocaleString("en-PK")}`;
}

function stockLabel(stock: number) {
  if (stock === 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
}

function stockColors(stock: number) {
  if (stock === 0) {
    return { background: "#FEE2E2", text: "#B91C1C" };
  }
  if (stock <= 5) {
    return { background: "#FFF2D7", text: "#92400E" };
  }
  return { background: "#DCFCE7", text: "#166534" };
}

export default function ProductsScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoProducts.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" ||
        (filter === "In stock" && product.stock > 5) ||
        (filter === "Low stock" && product.stock > 0 && product.stock <= 5) ||
        (filter === "Out of stock" && product.stock === 0);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  if (selected) {
    const stockStyle = stockColors(selected.stock);

    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable
            style={styles.backButton}
            onPress={() => setSelected(null)}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
            <Text style={styles.backText}>Back to products</Text>
          </Pressable>

          <View style={styles.productHero}>
            <View style={styles.productIconLarge}>
              <Ionicons name="cube-outline" size={44} color={colors.neutral} />
            </View>
            <Text style={styles.detailTitle}>{selected.name}</Text>
            <Text style={styles.detailCategory}>{selected.category}</Text>
            <Text style={styles.detailPrice}>{money(selected.price)}</Text>
            <View
              style={[
                styles.stockBadge,
                { backgroundColor: stockStyle.background },
              ]}
            >
              <Text style={[styles.stockText, { color: stockStyle.text }]}>
                {stockLabel(selected.stock)}
              </Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailHeading}>Product information</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Product ID</Text>
              <Text style={styles.detailValue}>{selected.id}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>SKU</Text>
              <Text style={styles.detailValue}>{selected.sku}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category</Text>
              <Text style={styles.detailValue}>{selected.category}</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Available stock</Text>
              <Text style={styles.detailValue}>{selected.stock} units</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Catalog status</Text>
              <Text style={styles.detailValue}>
                {selected.active ? "Active" : "Inactive"}
              </Text>
            </View>
            <View style={styles.separator} />

            <Text style={styles.detailHeading}>Description</Text>
            <Text style={styles.description}>{selected.description}</Text>
          </View>

          <View style={styles.notice}>
            <Ionicons
              name="information-circle-outline"
              size={19}
              color="#7A5A00"
            />
            <Text style={styles.noticeText}>
              Sample product. Editing and stock changes are not connected.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  const lowStockCount = demoProducts.filter(
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;

  const outOfStockCount = demoProducts.filter(
    (product) => product.stock === 0,
  ).length;

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
            <Text style={styles.eyebrow}>CATALOG MANAGEMENT</Text>
            <Text style={styles.title}>Products</Text>
            <Text style={styles.subtitle}>Manage your product catalog.</Text>
          </View>
          <View style={styles.countCircle}>
            <Text style={styles.countNumber}>{demoProducts.length}</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color="#7A5A00"
          />
          <Text style={styles.noticeText}>
            Sample catalog — changes are not saved to a server.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total products</Text>
            <Text style={styles.summaryValue}>{demoProducts.length}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Low stock</Text>
            <Text style={styles.summaryValue}>{lowStockCount}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Out of stock</Text>
            <Text style={styles.summaryValue}>{outOfStockCount}</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search name, SKU, or category"
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
          <Text style={styles.sectionTitle}>Catalog</Text>
          <Text style={styles.resultCount}>
            {visibleProducts.length} products
          </Text>
        </View>

        {visibleProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={32}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              Try another search or stock filter.
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
          visibleProducts.map((product) => {
            const stockStyle = stockColors(product.stock);

            return (
              <Pressable
                key={product.id}
                style={styles.productCard}
                onPress={() => setSelected(product)}
              >
                <View style={styles.productIcon}>
                  <Ionicons
                    name="cube-outline"
                    size={25}
                    color={colors.neutral}
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSku}>{product.sku}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>

                  <View style={styles.productBottom}>
                    <Text style={styles.productPrice}>
                      {money(product.price)}
                    </Text>
                    <Text style={styles.stockCount}>{product.stock} units</Text>
                  </View>
                </View>

                <View style={styles.productRight}>
                  <View
                    style={[
                      styles.stockBadge,
                      { backgroundColor: stockStyle.background },
                    ]}
                  >
                    <Text
                      style={[styles.stockText, { color: stockStyle.text }]}
                    >
                      {stockLabel(product.stock)}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textMuted}
                  />
                </View>
              </Pressable>
            );
          })
        )}

        <Text style={styles.footer}>RideGlow Owner · Sample catalog</Text>
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
  summaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    minHeight: 80,
    padding: 10,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  summaryLabel: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginTop: 5,
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
    fontSize: 13,
    color: colors.text,
    paddingVertical: 0,
  },
  filterList: {
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
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: 10,
  },
  productIcon: {
    width: 48,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
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
  productCategory: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 3,
  },
  productBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },
  stockCount: {
    fontSize: 10,
    color: colors.textMuted,
  },
  productRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
    gap: 12,
    paddingVertical: 2,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  stockText: {
    fontSize: 9,
    fontWeight: "800",
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
  productHero: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  productIconLarge: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  detailTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  detailCategory: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 5,
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginTop: 12,
    marginBottom: 12,
  },
  detailCard: {
    marginTop: 16,
    padding: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  detailHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
    textAlign: "right",
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  description: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.textMuted,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginBottom: 24,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    color: colors.textMuted,
  },
});

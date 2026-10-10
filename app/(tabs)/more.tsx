import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from "../../theme/tokens";

type MenuItem = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const sections: MenuSection[] = [
  {
    title: "CUSTOMERS & SALES",
    items: [
      {
        title: "Customers",
        description: "Customer profiles and purchase history",
        icon: "people-outline",
      },
      {
        title: "Payments & COD",
        description: "Payment records and cash on delivery",
        icon: "wallet-outline",
      },
      {
        title: "Shipping",
        description: "Shipments, couriers and tracking",
        icon: "car-outline",
      },
      {
        title: "Returns & refunds",
        description: "Returned orders and refund records",
        icon: "return-down-back-outline",
      },
    ],
  },
  {
    title: "PURCHASING",
    items: [
      {
        title: "Suppliers",
        description: "Supplier directory and contacts",
        icon: "business-outline",
      },
      {
        title: "Purchase orders",
        description: "Restocking and incoming deliveries",
        icon: "receipt-outline",
      },
    ],
  },
  {
    title: "GROWTH & REPORTS",
    items: [
      {
        title: "Coupons & marketing",
        description: "Discount codes and promotions",
        icon: "pricetag-outline",
      },
      {
        title: "Expenses & reports",
        description: "Business costs and sales performance",
        icon: "bar-chart-outline",
      },
    ],
  },
  {
    title: "TEAM & PREFERENCES",
    items: [
      {
        title: "Staff & permissions",
        description: "Team accounts and access control",
        icon: "shield-checkmark-outline",
      },
      {
        title: "Audit log",
        description: "History of administrative actions",
        icon: "document-text-outline",
      },
      {
        title: "Settings",
        description: "Store details and app preferences",
        icon: "settings-outline",
      },
    ],
  },
];

export default function MoreScreen() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>RIDEGLOW OWNER</Text>
        <Text style={styles.title}>More</Text>
        <Text style={styles.subtitle}>Manage your store from one place.</Text>

        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons
              name="storefront-outline"
              size={27}
              color={colors.neutral}
            />
          </View>

          <View style={styles.profileCopy}>
            <Text style={styles.profileName}>Your Store</Text>
            <Text style={styles.profileDescription}>Store administrator</Text>
            <View style={styles.demoBadge}>
              <View style={styles.demoDot} />
              <Text style={styles.demoText}>DEMO MODE</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle-outline"
            size={19}
            color="#7A5A00"
          />
          <Text style={styles.noticeText}>
            These menu items are placeholders. No store account or live business
            data is connected yet.
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <Pressable
                  key={item.title}
                  onPress={() => setSelectedFeature(item.title)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    index !== section.items.length - 1 && styles.menuDivider,
                    pressed && styles.menuItemPressed,
                  ]}
                >
                  <View style={styles.menuIcon}>
                    <Ionicons
                      name={item.icon}
                      size={21}
                      color={colors.neutral}
                    />
                  </View>

                  <View style={styles.menuCopy}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textMuted}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {selectedFeature !== null && (
          <View style={styles.featureNotice}>
            <View style={styles.featureNoticeHeader}>
              <Ionicons
                name="construct-outline"
                size={22}
                color={colors.neutral}
              />
              <Text style={styles.featureNoticeTitle}>{selectedFeature}</Text>
            </View>

            <Text style={styles.featureNoticeText}>
              This feature is planned but hasn't been built yet. We'll implement
              it in a later step.
            </Text>

            <Pressable
              onPress={() => setSelectedFeature(null)}
              style={styles.dismissButton}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.appInfo}>
          <View style={styles.appLogo}>
            <Ionicons name="flash-outline" size={20} color={colors.neutral} />
          </View>
          <Text style={styles.appName}>RideGlow Owner</Text>
          <Text style={styles.appVersion}>Owner app · Development build</Text>
          <Text style={styles.appFooter}>
            Built for better store management.
          </Text>
        </View>
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
    paddingBottom: 36,
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
    marginBottom: spacing.lg,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },
  profileDescription: {
    fontSize: 11,
    color: colors.textMuted,
  },
  demoBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FFF2D7",
    borderRadius: radius.pill,
  },
  demoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#B7791F",
  },
  demoText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 0.5,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    padding: 12,
    backgroundColor: "#FFF4CC",
    borderRadius: radius.md,
    marginBottom: spacing.xl,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#6B5100",
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.textMuted,
    marginBottom: 10,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 13,
  },
  menuItem: {
    minHeight: 75,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    paddingVertical: 12,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemPressed: {
    opacity: 0.65,
  },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  menuCopy: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },
  menuDescription: {
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
    marginTop: 4,
  },
  featureNotice: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  featureNoticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureNoticeTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },
  featureNoticeText: {
    fontSize: 12,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 10,
  },
  dismissButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: 13,
  },
  dismissButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.neutral,
  },
  appInfo: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  appLogo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  appName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },
  appVersion: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 5,
  },
  appFooter: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 8,
  },
});

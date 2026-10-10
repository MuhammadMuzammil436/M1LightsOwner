import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/tokens";

type TabIconName =
  | "home"
  | "home-outline"
  | "receipt"
  | "receipt-outline"
  | "cube"
  | "cube-outline"
  | "layers"
  | "layers-outline"
  | "grid"
  | "grid-outline";

function TabIcon({ name, focused }: { name: TabIconName; focused: boolean }) {
  return (
    <Ionicons
      name={name}
      size={22}
      color={focused ? colors.neutral : "#8B9388"}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.neutral,
        tabBarInactiveTintColor: "#8B9388",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E7DF",
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "receipt" : "receipt-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "cube" : "cube-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "layers" : "layers-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              name={focused ? "grid" : "grid-outline"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

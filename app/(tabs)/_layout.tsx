import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";
import Colors from "../../src/constants/Colors";
import { useCustomizationContext } from "../../src/context";
import { useAppTheme } from "../../src/theme";
import { CustomTheme } from "../../src/theme/types";

export const unstable_settings = {
  initialRouteName: "goals",
};

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { colorScheme } = useCustomizationContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            compact
            style={styles.navigationBar}
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route }) => navigation.navigate(route.name)}
            renderIcon={({ route, focused, color }) =>
              descriptors[route.key].options.tabBarIcon?.({
                focused,
                color,
                size: 24,
              }) ?? null
            }
            getLabelText={({ route }) => {
              const options = descriptors[route.key].options;

              return typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : (options.title ?? route.name);
            }}
          />
        )}
      >
        <Tabs.Screen
          name="goals"
          options={{
            title: "Goals",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="flag-checkered" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reading"
          options={{
            title: "Reading",
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />
        <Tabs.Screen
          name="rewards"
          options={{
            title: "Rewards",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="heart" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    navigationBar: {
      borderRadius: 80,
      overflow: "hidden",
      marginBottom: 0,
      marginHorizontal: 10,
      height: 80,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 3,
      borderColor: theme.colors.outlineVariant,
    },
  });

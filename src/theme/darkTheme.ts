import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { MD3DarkTheme } from "react-native-paper";

export const CustomDarkTheme = {
  ...MD3DarkTheme,
};

export const CustomNavigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: CustomDarkTheme.colors.primary,
    background: CustomDarkTheme.colors.background,
    card: CustomDarkTheme.colors.surface,
    text: CustomDarkTheme.colors.onSurface,
    border: CustomDarkTheme.colors.outlineVariant,
    notification: CustomDarkTheme.colors.error,
  },
};

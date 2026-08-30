import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { MD3LightTheme } from "react-native-paper";

export const CustomLightTheme = {
  ...MD3LightTheme,
};

export const CustomNavigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: CustomLightTheme.colors.primary,
    background: CustomLightTheme.colors.background,
    card: CustomLightTheme.colors.surface,
    text: CustomLightTheme.colors.onSurface,
    border: CustomLightTheme.colors.outlineVariant,
    notification: CustomLightTheme.colors.error,
  },
};

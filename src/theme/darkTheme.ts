import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { DeepPartial } from "react-hook-form";
import { MD3DarkTheme } from "react-native-paper";
import { FIXED_COLORS } from "./fixedColors";
import { CustomTheme } from "./types";

const THEME_OVERRIDE = {
  colors: {
    primary: "#55BCFF",
    onPrimary: "#003652",
    secondary: "#4BA8FD",
    onSecondary: "#002745",
    tertiary: "#FFFBD1",
    onTertiary: "#646200",
    error: "#FF716C",
    onError: "#490006",
    primaryContainer: "#00B0FD",
    onPrimaryContainer: "#002B42",
    secondaryContainer: "#0062A1",
    onSecondaryContainer: "#F5F8FF",
    tertiaryContainer: "#F6F14F",
    onTertiaryContainer: "#5C5900",
    errorContainer: "#9F0519",
    onErrorContainer: "#FFA8A3",
    surface: "#000F20",
    surfaceVariant: "#000F20",
    inverseSurface: "#F8F9FF",
    inverseOnSurface: "#3A5777",
    inversePrimary: "#006594",
    scrim: "#000000",
    onSurface: "#D6E7FF",
    onSurfaceVariant: "#90AED2",
    outline: "#5B7899",
    outlineVariant: "#184A76",
  },
} satisfies DeepPartial<typeof MD3DarkTheme>;

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...THEME_OVERRIDE.colors,
    success: "#51bd6c",
    fixed: FIXED_COLORS,
  },
} satisfies CustomTheme;

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

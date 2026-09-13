import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { DeepPartial } from "react-hook-form";
import { MD3DarkTheme } from "react-native-paper";
import { FIXED_COLORS } from "./fixedColors";
import { CustomTheme } from "./types";

const THEME_OVERRIDE = {
  colors: {
    primary: "#62C7F2",
    onPrimary: "#003548",
    secondary: "#AEBCC5",
    onSecondary: "#19323E",
    tertiary: "#E5BFA7",
    onTertiary: "#472B1B",
    error: "#FFB4AB",
    onError: "#690005",
    primaryContainer: "#159BCF",
    onPrimaryContainer: "#002E40",
    secondaryContainer: "#33434C",
    onSecondaryContainer: "#E5EDF1",
    tertiaryContainer: "#62442F",
    onTertiaryContainer: "#FFE9DB",
    errorContainer: "#8C1D25",
    onErrorContainer: "#FFDAD6",
    background: "#101417",
    onBackground: "#DDE6EB",
    surface: "#171C20",
    surfaceVariant: "#252D32",
    inverseSurface: "#DDE6EB",
    inverseOnSurface: "#263238",
    inversePrimary: "#00658A",
    scrim: "#000000",
    onSurface: "#DDE6EB",
    onSurfaceVariant: "#B7C4CC",
    outline: "#82919A",
    outlineVariant: "#3D4A51",
  },
} satisfies DeepPartial<typeof MD3DarkTheme>;

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...THEME_OVERRIDE.colors,
    success: "#3E9B59",
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

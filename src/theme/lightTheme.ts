import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DeepPartial } from "react-hook-form";
import { MD3LightTheme } from "react-native-paper";
import { FIXED_COLORS } from "./fixedColors";

const THEME_OVERRIDE = {
  colors: {
    primary: "#0796D2",
    onPrimary: "#FFFFFF",
    secondary: "#526873",
    onSecondary: "#FFFFFF",
    tertiary: "#7A4F35",
    onTertiary: "#FFFFFF",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    primaryContainer: "#18A8E2",
    onPrimaryContainer: "#062F43",
    secondaryContainer: "#E5EBEF",
    onSecondaryContainer: "#274451",
    tertiaryContainer: "#F3D8C8",
    onTertiaryContainer: "#57321E",
    errorContainer: "#F36B6F",
    onErrorContainer: "#4F1014",
    background: "#F8F9FB",
    onBackground: "#173142",
    surface: "#FFFFFF",
    surfaceVariant: "#EEF2F5",
    inverseSurface: "#26323A",
    inverseOnSurface: "#EFF1F3",
    inversePrimary: "#8ED7F5",
    scrim: "#000000",
    onSurface: "#173142",
    onSurfaceVariant: "#536875",
    outline: "#8A9AA6",
    outlineVariant: "#C7D0D7",
  },
} satisfies DeepPartial<typeof MD3LightTheme>;

export const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...THEME_OVERRIDE.colors,
    success: "#3E9B59",
    fixed: FIXED_COLORS,
  },
} as const;

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

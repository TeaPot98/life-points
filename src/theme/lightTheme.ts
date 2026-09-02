import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DeepPartial } from "react-hook-form";
import { MD3LightTheme } from "react-native-paper";
import { ShadedColor } from "./types";

const THEME_OVERRIDE = {
  colors: {
    primary: "#03A9F4",
    onPrimary: "#EAF4FF",
    secondary: "#005F9D",
    onSecondary: "#ECF3FF",
    tertiary: "#615E00",
    onTertiary: "#FEF956",
    error: "#B31B25",
    onError: "#FFEFEE",
    primaryContainer: "#00B0FD",
    onPrimaryContainer: "#002B42",
    secondaryContainer: "#B2D5FF",
    onSecondaryContainer: "#004A7C",
    tertiaryContainer: "#FFB289",
    onTertiaryContainer: "#633011",
    errorContainer: "#FB5151",
    onErrorContainer: "#570008",
    surface: "#F3F6FF",
    surfaceVariant: "#B7D7FF",
    inverseSurface: "#000F20",
    inverseOnSurface: "#829FC3",
    inversePrimary: "#00B0FD",
    scrim: "#000000",
    onSurface: "#0E304E",
    onSurfaceVariant: "#405E7E",
    outline: "#5C799B",
    outlineVariant: "#5C799B",
  },
} satisfies DeepPartial<typeof MD3LightTheme>;

export const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...THEME_OVERRIDE.colors,
    // outline: "#AAA",
    // primary: THEME_OVERRIDE.colors.primary,
    fixed: {
      primary: {
        main: "#00B0FD",
        dark: "#002B42",
        contrastText: "#002B42",
      },
      lightBlue: {
        main: "#62cadf",
        dark: "#0288D1",
        contrastText: "#FFF",
      },
      red: {
        main: "#DB073D",
        dark: "#8F0A2B",
        contrastText: "#FFF",
      },
    } satisfies Record<string, ShadedColor>,
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

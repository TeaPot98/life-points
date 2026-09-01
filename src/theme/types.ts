import { CustomLightTheme } from "./lightTheme";

export interface ShadedColor {
  main: string;
  dark: string;
  contrastText: string;
}

export type CustomTheme = typeof CustomLightTheme;

export type ThemeShadedColor = keyof CustomTheme["colors"]["shaded"];

export type CoreColor = "primary" | "secondary" | "tertiary" | "error";

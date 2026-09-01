import { CoreColor, CustomTheme } from "./types";
import { useAppTheme } from "./useAppTheme";

export function getContainerColors(color: CoreColor, theme: CustomTheme) {
  switch (color) {
    case "primary":
      return {
        container: theme.colors.primaryContainer,
        onContainer: theme.colors.onPrimaryContainer,
      };
    case "secondary":
      return {
        container: theme.colors.secondaryContainer,
        onContainer: theme.colors.onSecondaryContainer,
      };
    case "tertiary":
      return {
        container: theme.colors.tertiaryContainer,
        onContainer: theme.colors.onTertiaryContainer,
      };
    case "error":
      return {
        container: theme.colors.errorContainer,
        onContainer: theme.colors.onErrorContainer,
      };
    default:
      return {
        container: theme.colors.primaryContainer,
        onContainer: theme.colors.onPrimaryContainer,
      };
  }
}

export function useContainerColors(color: CoreColor) {
  const theme = useAppTheme();
  return getContainerColors(color, theme);
}

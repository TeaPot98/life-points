import { MD3Theme, useTheme } from "react-native-paper";

interface CustomTheme extends MD3Theme {}

// TODO: Add type for custom theme
export const useAppTheme = () => useTheme<CustomTheme>();

import { useTheme } from "react-native-paper";
import { CustomTheme } from "./types";

export const useAppTheme = () => useTheme<CustomTheme>();

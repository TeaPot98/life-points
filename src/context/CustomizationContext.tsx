import { createContext, useContext } from "react";

export type ColorScheme = "light" | "dark";

type CustomizationContextValue = {
  colorScheme: ColorScheme;
  toggleColorScheme: (colorScheme: ColorScheme) => void;
};

export const CustomizationContext = createContext<CustomizationContextValue>({
  colorScheme: "light",
  toggleColorScheme: () => {},
});

export const useCustomizationContext = () => useContext(CustomizationContext);

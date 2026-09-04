import { useColorScheme } from "@components/useColorScheme";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type ColorScheme = "light" | "dark";

type CustomizationContextValue = {
  colorScheme: ColorScheme;
  toggleColorScheme: (colorScheme: ColorScheme) => void;
  setCustomizationModalOpen: (open: boolean) => void;
  isCustomizationModalOpen: boolean;
};

export const CustomizationContext = createContext<CustomizationContextValue>({
  colorScheme: "light",
  toggleColorScheme: () => {},
  setCustomizationModalOpen: () => {},
  isCustomizationModalOpen: false,
});

export const useCustomizationContext = () => useContext(CustomizationContext);

export const CustomizationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [isCustomizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme | "system">(
    "light",
  );
  const systemColorScheme = useColorScheme();

  const activeColorScheme =
    colorScheme === "system" ? (systemColorScheme ?? "light") : colorScheme;

  return (
    <CustomizationContext
      value={{
        colorScheme: activeColorScheme,
        toggleColorScheme: setColorScheme,
        isCustomizationModalOpen,
        setCustomizationModalOpen,
      }}
    >
      {children}
    </CustomizationContext>
  );
};

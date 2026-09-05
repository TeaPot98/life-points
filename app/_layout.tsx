import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  CustomizationContext,
  CustomizationContextProvider,
  UserContextProvider,
} from "@context";
import { CustomizationModal } from "@features/customization";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CustomDarkTheme,
  CustomLightTheme,
  CustomNavigationDarkTheme,
  CustomNavigationLightTheme,
} from "@theme";
import { PaperProvider } from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)/goals",
};

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <CustomizationContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CustomizationContext.Consumer>
            {({ colorScheme }) => (
              <PaperProvider
                theme={
                  colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme
                }
              >
                <ThemeProvider
                  value={
                    colorScheme === "dark"
                      ? CustomNavigationDarkTheme
                      : CustomNavigationLightTheme
                  }
                >
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="modal"
                      options={{ presentation: "modal" }}
                    />
                  </Stack>
                  <CustomizationModal />
                </ThemeProvider>
              </PaperProvider>
            )}
          </CustomizationContext.Consumer>
        </UserContextProvider>
      </QueryClientProvider>
    </CustomizationContextProvider>
  );
}

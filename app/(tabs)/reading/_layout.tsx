import { Stack } from "expo-router";
import "react-native-reanimated";
import { TabHeader } from "../../../src/components";
import { BooksContextProvider } from "../../../src/context";
import {
  BookModal,
  ReadingTrackerSettingsModal,
} from "../../../src/features/reading/components";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ReadingLayout() {
  return (
    <BooksContextProvider>
      <Stack
        screenOptions={{
          header: ({ navigation, options, back }) => (
            <TabHeader
              canGoBack={!!back}
              title={options.title}
              onGoBack={navigation.goBack}
            />
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Reading",
          }}
        />
        <Stack.Screen name="books/create" options={{ title: "Add Book" }} />
        <Stack.Screen name="books/[id]/edit" options={{ title: "Edit Book" }} />
      </Stack>
      <BookModal />
      <ReadingTrackerSettingsModal />
    </BooksContextProvider>
  );
}

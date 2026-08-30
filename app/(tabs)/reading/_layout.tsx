import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ReadingLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/reading/manage")}
              style={{ backgroundColor: "#ccc" }}
            >
              <FontAwesome name="cog" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="manage" />
      <Stack.Screen name="books/create" />
      <Stack.Screen name="books/[id]/edit" />
    </Stack>
  );
}

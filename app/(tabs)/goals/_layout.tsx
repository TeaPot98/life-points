import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ActivitiesLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/goals/manage-goals")}
              style={{ backgroundColor: "#ccc" }}
            >
              <FontAwesome name="cog" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="manage-goals" />
      <Stack.Screen name="create-goal" />
      <Stack.Screen name="create-activity" />
    </Stack>
  );
}

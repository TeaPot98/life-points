import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ActivitiesLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        header: ({ navigation, options, back }) => (
          <Appbar.Header>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={options.title ?? ""} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Goals",
          headerLeft: () => (
            <Pressable
              onPress={() => router.push("/goals/manage")}
              style={{ backgroundColor: "#ccc" }}
            >
              <FontAwesome name="cog" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="manage" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]/edit" />
      <Stack.Screen name="user-goals/[id]" />
      <Stack.Screen name="activities/manage" />
      <Stack.Screen name="activities/create" />
      <Stack.Screen name="activities/[id]/edit" />
    </Stack>
  );
}

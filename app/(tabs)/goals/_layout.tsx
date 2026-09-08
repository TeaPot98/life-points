import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";
import { TabHeader } from "../../../src/components";
import { GoalsContextProvider } from "../../../src/context";
import { CountGoalModal } from "../../../src/features/goals/components";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ActivitiesLayout() {
  const router = useRouter();

  return (
    <>
      <GoalsContextProvider>
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
          <Stack.Screen name="manage" options={{ title: "Manage Goals" }} />
          <Stack.Screen name="create" options={{ title: "Create Goal" }} />
          <Stack.Screen name="[id]/edit" options={{ title: "Edit Goal" }} />
          <Stack.Screen
            name="user-goals/[id]"
            options={{ title: "Goal Details" }}
          />
          <Stack.Screen
            name="activities/manage"
            options={{ title: "Manage Activities" }}
          />
          <Stack.Screen
            name="activities/create"
            options={{ title: "Create Activity" }}
          />
          <Stack.Screen
            name="activities/[id]/edit"
            options={{ title: "Edit Activity" }}
          />
        </Stack>
        <CountGoalModal />
      </GoalsContextProvider>
    </>
  );
}

import { TabHeader } from "../../../src/components";
import { GoalsContextProvider } from "../../../src/context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CountGoalModal } from "../../../src/features/goals/components";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";

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
          <Stack.Screen name="manage" />
          <Stack.Screen name="create" />
          <Stack.Screen name="[id]/edit" />
          <Stack.Screen name="user-goals/[id]" />
          <Stack.Screen name="activities/manage" />
          <Stack.Screen name="activities/create" />
          <Stack.Screen name="activities/[id]/edit" />
        </Stack>
        <CountGoalModal />
      </GoalsContextProvider>
    </>
  );
}

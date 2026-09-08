import { Stack } from "expo-router";
import "react-native-reanimated";
import { TabHeader } from "../../../src/components";

export default function RewardsLayout() {
  return (
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
      <Stack.Screen name="index" options={{ title: "Rewards" }} />
      <Stack.Screen name="create" options={{ title: "Create Reward" }} />
      <Stack.Screen name="shop" options={{ title: "Rewards Shop" }} />
      <Stack.Screen
        name="reward-activities/[id]/edit"
        options={{ title: "Edit Reward Activity" }}
      />
      <Stack.Screen
        name="reward-activities/create"
        options={{ title: "Create Reward Activity" }}
      />
      <Stack.Screen
        name="reward-activities/manage"
        options={{ title: "Manage Reward Activities" }}
      />
    </Stack>
  );
}

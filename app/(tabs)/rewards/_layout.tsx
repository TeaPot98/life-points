import { TabHeader } from "@components";
import { Stack } from "expo-router";
import "react-native-reanimated";

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
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="shop" />
      <Stack.Screen name="reward-activities/[id]/edit" />
      <Stack.Screen name="reward-activities/create" />
      <Stack.Screen name="reward-activities/manage" />
    </Stack>
  );
}

import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RewardsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="create-reward" />
      <Stack.Screen name="create-reward-activity" />
    </Stack>
  );
}

import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { FAB, getFabActionProps } from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import { RewardCard } from "../../../src/features/rewards/components";
import { useAppTheme } from "../../../src/theme";

export default function RewardsShopScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: rewards, isLoading } = useQuery({
    queryKey: queryKeyStore.rewards.getAll,
    queryFn: () => Api.rewards.getAll(user?.id ?? ""),
    enabled: !!user,
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {rewards?.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
        {isLoading && (
          <ActivityIndicator size={80} style={styles.activityIndicator} />
        )}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "gamepad",
                label: "Reward Activity",
                onPress: () => router.push("/rewards/reward-activities/create"),
                ...getFabActionProps(theme),
              },
              {
                icon: "heart",
                label: "Reward",
                onPress: () => router.push("/(tabs)/rewards/create"),
                ...getFabActionProps(theme),
              },
            ]}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  activityIndicator: { marginTop: 80 },
});

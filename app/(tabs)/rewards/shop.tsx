import { ScrollView, StyleSheet, View } from "react-native";

import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { FAB } from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import { RewardCard } from "../../../src/features/rewards/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function RewardsShopScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: rewards } = useQuery({
    queryKey: queryKeyStore.rewards.getAll,
    queryFn: () => Api.rewards.getAll(user?.id ?? ""),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {rewards?.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "star",
                label: "Activity Reward",
                onPress: () => router.push("/rewards/reward-activities/create"),
              },
              {
                icon: "star",
                label: "Reward",
                onPress: () => router.push("/(tabs)/rewards/create"),
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
});

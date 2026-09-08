import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { SectionDivider } from "../../../../src/components";
import { Button, FAB } from "../../../../src/components/buttons";
import { useUserContext } from "../../../../src/context";
import { DEFAULT_REWARD_ACTIVITIES } from "../../../../src/data";
import { RewardActivityCard } from "../../../../src/features/rewards/components";

export default function ManageRewardActivitiesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: rewardActivities, isLoading: isRewardActivitiesLoading } =
    useQuery({
      queryKey: queryKeyStore.rewardActivities.getAll,
      queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
    });

  return (
    <ScrollView>
      <View style={styles.container}>
        <SectionDivider text="Custom Activities" />
        {!isRewardActivitiesLoading && !rewardActivities?.length && (
          <Button color="secondary">Add Reward Activity</Button>
        )}
        {rewardActivities?.map((rewardActivity) => (
          <RewardActivityCard
            key={rewardActivity.id}
            rewardActivity={rewardActivity}
          />
        ))}
        <SectionDivider text="Default Activities" />
        {DEFAULT_REWARD_ACTIVITIES.map((rewardActivity) => (
          <RewardActivityCard
            key={rewardActivity.id}
            rewardActivity={rewardActivity}
          />
        ))}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "star",
                label: "Reward Activity",
                onPress: () => router.push("/rewards/reward-activities/create"),
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

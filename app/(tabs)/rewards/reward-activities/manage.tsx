import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { SectionDivider } from "../../../../src/components";
import { Button, FAB } from "../../../../src/components/buttons";
import { useUserContext } from "../../../../src/context";
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
      enabled: !!user,
    });

  const customActivities = rewardActivities?.filter((a) => a.user_id);

  const defaultActivities = rewardActivities?.filter((a) => !a.user_id);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SectionDivider text="Custom Activities" />
        <Button color="secondary">Add Reward Activity</Button>
        {customActivities?.map((rewardActivity) => (
          <RewardActivityCard
            key={rewardActivity.id}
            rewardActivity={rewardActivity}
          />
        ))}
        {isRewardActivitiesLoading && (
          <ActivityIndicator size={80} style={styles.activityIndicator} />
        )}
        <SectionDivider text="Default Activities" />
        {defaultActivities?.map((rewardActivity) => (
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
  activityIndicator: { marginTop: 80 },
});

import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { RewardActivityCard } from "@features/rewards/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function ManageRewardActivitiesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: rewardActivities } = useQuery({
    queryKey: queryKeyStore.rewardActivities.getAll,
    queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {rewardActivities?.map((rewardActivity) => (
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
                onPress: () => router.push("/goals/activities/create"),
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

import { StyleSheet } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useUserContext } from "@context";
import { RewardActivityCard } from "@features/rewards/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function ManageRewardActivitiesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();

  const { data: rewardActivities } = useQuery({
    queryKey: ["reward-activities"],
    queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Reward Activities</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

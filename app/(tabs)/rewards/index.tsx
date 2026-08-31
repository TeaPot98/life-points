import { StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { UserRewardCard } from "@features/rewards/components/UserRewardCard";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native-paper";

export default function UserRewardsTabScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();

  const { data: userRewards } = useQuery({
    queryKey: ["user-rewards"],
    queryFn: () => Api.userRewards.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          router.push("/rewards/reward-activities/manage");
        }}
      >
        Manage Reward Activities
      </Button>
      <Text style={styles.title}>Rewards Tab</Text>
      <Button
        onPress={() => {
          router.push("/rewards/shop");
        }}
      >
        Buy Rewards
      </Button>
      <View style={styles.separator} />
      {userRewards?.map((userReward) => (
        <UserRewardCard key={userReward.id} userReward={userReward} />
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
              onPress: () => router.push("/rewards/create"),
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

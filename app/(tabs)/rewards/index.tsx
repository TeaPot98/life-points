import { StyleSheet } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useUserContext } from "@context";
import { UserRewardCard } from "@features/rewards/components/UserRewardCard";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

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
      <Text style={styles.title}>Rewards Tab</Text>
      <Button
        onPress={() => {
          router.push("/rewards/rewards-shop");
        }}
      >
        Buy Rewards
      </Button>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {userRewards?.map((userReward) => (
        <UserRewardCard key={userReward.id} userReward={userReward} />
      ))}
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "star",
              label: "Activity Reward",
              onPress: () => router.push("/rewards/create-reward-activity"),
            },
            {
              icon: "star",
              label: "Reward",
              onPress: () => router.push("/rewards/create-reward"),
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

import { StyleSheet } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useUserContext } from "@context";
import { RewardCard } from "@features/rewards/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function RewardsShopScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();

  const { data: rewards } = useQuery({
    queryKey: ["rewards"],
    queryFn: () => Api.rewards.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards Shop</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {rewards?.map((reward) => (
        <RewardCard key={reward.id} reward={reward} />
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

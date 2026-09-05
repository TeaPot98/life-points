import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { Button, FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { UserRewardCard } from "@features/rewards/components/UserRewardCard";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Divider } from "react-native-paper";

export default function UserRewardsTabScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: userRewards } = useQuery({
    queryKey: queryKeyStore.userRewards.getAll,
    queryFn: () => Api.userRewards.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          color="tertiary"
          onPress={() => {
            router.push("/rewards/reward-activities/manage");
          }}
        >
          Manage Reward Activities
        </Button>
        <Button
          color="tertiary"
          onPress={() => {
            router.push("/rewards/shop");
          }}
        >
          Buy Rewards
        </Button>
      </View>
      <Divider style={styles.divider} />
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.cardsContainer}>
          {userRewards?.map((userReward) => (
            <UserRewardCard key={userReward.id} userReward={userReward} />
          ))}
          {isFocused && (
            <FAB
              actions={[
                {
                  icon: "star",
                  label: "Activity Reward",
                  onPress: () =>
                    router.push("/rewards/reward-activities/create"),
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
  divider: { marginTop: 8 },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  cardsContainer: { gap: 8 },
});

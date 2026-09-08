import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Divider } from "react-native-paper";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import {
  Button,
  FAB,
  getFabActionProps,
} from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import { UserRewardCard } from "../../../src/features/rewards/components/UserRewardCard";
import { useAppTheme } from "../../../src/theme";

export default function UserRewardsTabScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const theme = useAppTheme();

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
                  icon: "gamepad",
                  label: "Activity Reward",
                  onPress: () =>
                    router.push("/rewards/reward-activities/create"),
                  ...getFabActionProps(theme),
                },
                {
                  icon: "heart",
                  label: "Reward",
                  onPress: () => router.push("/rewards/create"),
                  ...getFabActionProps(theme),
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
  fabAction: {},
});

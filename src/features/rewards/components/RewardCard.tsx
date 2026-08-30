import Api from "@api";
import { useUserContext } from "@context";
import { IReward } from "@local-types/rewards";
import { useMutation } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type RewardCardProps = {
  reward: IReward;
};

export const RewardCard = ({ reward }: RewardCardProps) => {
  const { user } = useUserContext();
  const userId = user?.id ?? "";

  const { mutate: buyReward } = useMutation({
    mutationFn: async (rewardId: number) => {
      await Api.userData.updatePoints(-reward.price);

      return Api.userRewards.create({ reward_id: rewardId, user_id: userId });
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>{reward.activity.name}</Text>
        <Text>duration: {reward.duration}</Text>
        <Text>price: {reward.price}</Text>
      </View>
      <Button onPress={() => buyReward(reward.id)}>Buy</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },
  rowContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconContainer: {
    backgroundColor: "#ccc",
    aspectRatio: 1,
    width: 60,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { IRewardActivity } from "@local-types/rewards";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type RewardActivityCardProps = {
  rewardActivity: IRewardActivity;
};

export const RewardActivityCard = ({
  rewardActivity,
}: RewardActivityCardProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>{rewardActivity.name}</Text>
        <Text>{rewardActivity.icon}</Text>
      </View>
      <Button
        onPress={() =>
          router.push({
            pathname: "/rewards/reward-activities/[id]/edit",
            params: { id: String(rewardActivity.id) },
          })
        }
      >
        Edit
      </Button>
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

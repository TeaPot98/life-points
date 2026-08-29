import { Text, View } from "@components/Themed";
import { IUserReward } from "@local-types/rewards";
import { StyleSheet } from "react-native";

type UserRewardCardProps = {
  userReward: IUserReward;
};

export const UserRewardCard = ({
  userReward: { reward, claimed_at },
}: UserRewardCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>claimed at: {claimed_at}</Text>
        <Text>{reward.activity.name}</Text>
        <Text>duration: {reward.duration}</Text>
        <Text>price: {reward.price}</Text>
      </View>
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

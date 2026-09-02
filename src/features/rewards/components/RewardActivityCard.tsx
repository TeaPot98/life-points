import { Card, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { IRewardActivity } from "@local-types/rewards";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type RewardActivityCardProps = {
  rewardActivity: IRewardActivity;
};

export const RewardActivityCard = ({
  rewardActivity,
}: RewardActivityCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground name={rewardActivity.icon} />
            <Text variant="titleMedium">{rewardActivity.name}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
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
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
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

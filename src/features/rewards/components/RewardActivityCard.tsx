import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Card, IconWithBackground } from "../../../components";
import { IconButton } from "../../../components/buttons";
import { FixedColor } from "../../../theme/types";
import { FontAwesomeName } from "../../../types/icons";
import {
  IDefaultRewardActivity,
  IRewardActivity,
} from "../../../types/rewards";
import { isNil } from "../../../utils";

type RewardActivityCardProps = {
  rewardActivity: IRewardActivity | IDefaultRewardActivity;
};

export const RewardActivityCard = ({
  rewardActivity,
}: RewardActivityCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground
              name={rewardActivity.icon as FontAwesomeName}
              color={rewardActivity.color as FixedColor}
            />
            <Text variant="titleMedium">{rewardActivity.name}</Text>
          </View>
        </View>
        {!isNil(rewardActivity.user_id) && (
          <Card.Actions>
            <IconButton
              icon="pencil"
              color="secondary"
              onPress={() =>
                router.push({
                  pathname: "/rewards/reward-activities/[id]/edit",
                  params: { id: String(rewardActivity.id) },
                })
              }
            />
          </Card.Actions>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
  },
  cardContent: { flexDirection: "row", justifyContent: "space-between" },
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

import { Card, IconWithBackground } from "@components";
import { ProgressBar } from "@components/ProgressBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ActivityType } from "@local-types/activities";
import { IUserGoal } from "@local-types/goals";
import { isNil } from "@utils";
import { computeGoalCompletionPercentage } from "@utils/goals";
import { useRouter } from "expo-router";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type UserGoalCardProps = {
  userGoal: IUserGoal;
};

export const UserGoalCard = ({ userGoal }: UserGoalCardProps) => {
  const router = useRouter();
  const percentage = computeGoalCompletionPercentage(userGoal);
  const {
    id,
    goal: {
      type,
      duration,
      goal_count,
      activity_id,
      reward,
      reward_per_item,
      schedule,
      name,
      activity,
    },
  } = userGoal;

  return (
    <Card
      onPress={() =>
        router.push({
          pathname: "/(tabs)/goals/user-goals/[id]",
          params: { id },
        })
      }
    >
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground name={activity.icon} />
            <Text>{name}</Text>
            <FontAwesome name={TYPE_ICONS[type]} size={16} />
            <Text>{duration}</Text>
            <Text>{goal_count}</Text>
            <Text>{activity_id}</Text>
            <Text>{reward}</Text>
            <Text>{reward_per_item}</Text>
            <Text>{schedule}</Text>
          </View>
          {!isNil(percentage) && (
            <ProgressBar
              percentage={percentage}
              style={{ alignSelf: "stretch" }}
            />
          )}
          <Card.Actions>
            <Button>Edit</Button>
          </Card.Actions>
        </View>
      </Card.Content>
    </Card>
  );
};

const TYPE_ICONS = {
  time: "clock-o",
  count: "braille",
  milestone: "share",
} satisfies Record<ActivityType, ComponentProps<typeof FontAwesome>["name"]>;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  rowContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
});

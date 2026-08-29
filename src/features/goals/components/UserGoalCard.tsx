import { ProgressBar } from "@components/ProgressBar";
import { Text, View } from "@components/Themed";
import { IUserGoal } from "@local-types/goals";
import { isNil } from "@utils";
import { computeGoalCompletionPercentage } from "@utils/goals";
import { StyleSheet } from "react-native";

type UserGoalCardProps = {
  userGoal: IUserGoal;
};

export const UserGoalCard = ({ userGoal }: UserGoalCardProps) => {
  const percentage = computeGoalCompletionPercentage(userGoal);
  const {
    goal: {
      type,
      duration,
      goal_count,
      activity_id,
      reward,
      reward_per_item,
      schedule,
      name,
    },
  } = userGoal;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* <View style={styles.iconContainer}>
          <FontAwesome name={icon} size={24} />
        </View> */}
        <Text>{name}</Text>
        <Text>{type}</Text>
        <Text>{duration}</Text>
        <Text>{goal_count}</Text>
        <Text>{activity_id}</Text>
        <Text>{reward}</Text>
        <Text>{reward_per_item}</Text>
        <Text>{schedule}</Text>
      </View>
      {!isNil(percentage) && (
        <ProgressBar percentage={percentage} style={{ alignSelf: "stretch" }} />
      )}
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

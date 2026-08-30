import Api from "@api";
import { ProgressBar } from "@components/ProgressBar";
import { Text, View } from "@components/Themed";
import { IMilestone, IUserGoal } from "@local-types/goals";
import { useMutation } from "@tanstack/react-query";
import { isNil } from "@utils";
import { computeGoalCompletionPercentage } from "@utils/goals";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type MilestoneUserGoalDetailsProps = {
  userGoal: IUserGoal;
};

export const MilestoneUserGoalDetails = ({
  userGoal,
}: MilestoneUserGoalDetailsProps) => {
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
      milestones,
    },
  } = userGoal;

  const { mutate: markMilestoneAsComplete } = useMutation({
    mutationFn: (milestone: IMilestone) =>
      Api.milestones.update(milestone.id, {
        ...milestone,
        completed_at: dayjs().toISOString(),
      }),
  });

  return (
    <View>
      {" "}
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
      <View>
        {milestones.map((milestone) => (
          <View key={milestone.id}>
            <Text>{milestone.name}</Text>
            <Text>{milestone.reward}</Text>
            <Text>
              Compl: {!isNil(milestone.completed_at) ? "true" : "false"}
            </Text>
            <Button onPress={() => markMilestoneAsComplete(milestone)}>
              Mark as complete
            </Button>
          </View>
        ))}
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

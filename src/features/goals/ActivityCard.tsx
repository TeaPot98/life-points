import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ActivityType } from "@local-types/activities";
import { GoalSchedule } from "@local-types/goals";
import { StyleSheet } from "react-native";
import { ProgressBar } from "../../components/ProgressBar";
import { Text, View } from "../../components/Themed";

type GoalCardProps = {
  activityId: number;
  name: string;
  type: ActivityType;
  reward: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  duration?: number;
  goalCount?: number;
};

export const GoalCard = ({
  activityId,
  name,
  reward,
  type,
  duration,
  goalCount,
  reward_per_item,
  schedule,
}: GoalCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="music" size={24} />
        </View>
        <Text>Guitar practice</Text>
      </View>
      <ProgressBar percentage={50} style={{ alignSelf: "stretch" }} />
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

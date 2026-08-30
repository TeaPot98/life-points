import { IGoal } from "@local-types/goals";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type GoalCardProps = {
  goal: IGoal;
};

export const GoalCard = ({
  goal: {
    id,
    name,
    type,
    duration,
    goal_count,
    activity_id,
    reward,
    reward_per_item,
    schedule,
  },
}: GoalCardProps) => {
  const router = useRouter();

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
      <Button
        onPress={() =>
          router.push({
            pathname: "/goals/[id]/edit",
            params: { id: String(id) },
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

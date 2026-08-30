import { StyleSheet, View } from "react-native";

import Api from "@api";
import { useUserContext } from "@context";
import { MilestoneUserGoalDetails } from "@features/goals/components";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

export default function UserGoalDetailsScreen() {
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: userGoal } = useQuery({
    queryKey: ["user-goals", id],
    queryFn: () => Api.userGoals.getById(Number(id), user?.id ?? ""),
  });

  if (!userGoal) return;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <View style={styles.separator} />
      {userGoal.goal.type === "milestone" && (
        <MilestoneUserGoalDetails userGoal={userGoal} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { useUserContext } from "@context";
import {
  MilestoneUserGoalDetails,
  UserGoalCard,
} from "@features/goals/components";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Divider, Text } from "react-native-paper";

export default function UserGoalDetailsScreen() {
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: userGoal } = useQuery({
    queryKey: ["user-goals", id],
    queryFn: () => Api.userGoals.getById(Number(id), user?.id ?? ""),
  });

  if (!userGoal) return;

  return (
    <ScrollView>
      <View style={styles.container}>
        <UserGoalCard userGoal={userGoal} hidePlusButton />
        <Text style={styles.milestonesLabel}>Milestones</Text>
        <Divider style={styles.divider} />
        {userGoal.goal.type === "milestone" && (
          <MilestoneUserGoalDetails userGoal={userGoal} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  milestonesLabel: { marginTop: 8 },
  divider: { marginBottom: 8 },
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

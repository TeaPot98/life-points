import { ScrollView, StyleSheet, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { SectionDivider } from "../../../../src/components";
import { useUserContext } from "../../../../src/context";
import {
  MilestoneUserGoalDetails,
  UserGoalCard,
} from "../../../../src/features/goals/components";

export default function UserGoalDetailsScreen() {
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryKeyStore = useQueryKeyStore();

  const { data: userGoal } = useQuery({
    queryKey: queryKeyStore.userGoals.getById(Number(id)),
    queryFn: () => Api.userGoals.getById(Number(id), user?.id ?? ""),
    enabled: !!user,
  });

  if (!userGoal) return;

  return (
    <ScrollView>
      <View style={styles.container}>
        <UserGoalCard userGoal={userGoal} hidePlusButton />
        <SectionDivider text="Milestones" style={styles.divider} />
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
  divider: { marginVertical: 8 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

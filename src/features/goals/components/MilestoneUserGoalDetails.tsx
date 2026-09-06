import Api from "../../../api";
import { useMarkUserGoalAsCompleted, useQueryKeyStore } from "../../../api-hooks";
import { Card, Chip } from "../../../components";
import { Button } from "../../../components/buttons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IMilestone, IUserGoal } from "../../../types/goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type MilestoneUserGoalDetailsProps = {
  userGoal: IUserGoal;
};

export const MilestoneUserGoalDetails = ({
  userGoal,
}: MilestoneUserGoalDetailsProps) => {
  const {
    goal: { milestones },
  } = userGoal;
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const markGoalAsCompleted = useMarkUserGoalAsCompleted();

  const { mutateAsync: updateUserPoints } = useMutation({
    mutationFn: Api.userData.updatePoints,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeyStore.userData.get }),
  });

  const { mutate: markMilestoneAsComplete } = useMutation({
    mutationFn: async (milestone: IMilestone) => {
      const completedMilestones = Array.from(
        new Set(userGoal.completed_milestones.concat(milestone.id)),
      );

      if (completedMilestones.length >= milestones.length) {
        await markGoalAsCompleted(userGoal);
      } else {
        await Api.userGoals.update(userGoal.id, {
          completed_milestones: completedMilestones,
        });
        await updateUserPoints(milestone.reward);
      }
    },
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getById(id),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getAll,
      });
    },
  });

  return (
    <View style={styles.container}>
      {milestones.map((milestone) => {
        const isCompleted = userGoal.completed_milestones.includes(
          milestone.id,
        );

        return (
          <Card key={milestone.id}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.titleContainer}>
                <Text variant="bodyLarge">{milestone.name}</Text>
                <Chip icon="diamond">{milestone.reward}</Chip>
              </View>
              {isCompleted ? (
                <Chip icon="check">Completed</Chip>
              ) : (
                <Button onPress={() => markMilestoneAsComplete(milestone)}>
                  <FontAwesome name="check" />
                </Button>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  titleContainer: { alignItems: "flex-start", gap: 4 },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

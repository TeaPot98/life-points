import Api from "@api";
import { Card, Chip } from "@components";
import { Button } from "@components/buttons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IUserGoal } from "@local-types/goals";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate: markMilestoneAsComplete } = useMutation({
    mutationFn: (id: number) =>
      Api.userGoals.update(userGoal.id, {
        completed_milestones: Array.from(
          new Set(userGoal.completed_milestones.concat(id)),
        ),
      }),
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
                <Button onPress={() => markMilestoneAsComplete(milestone.id)}>
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

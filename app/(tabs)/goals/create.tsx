import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../src/context";
import { GoalForm, GoalFormValues } from "../../../src/features/goals";

export default function CreateGoalScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createGoal } = useMutation({
    mutationFn: Api.goals.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.goals.getAll,
      }),
  });

  const { mutateAsync: createMilestones } = useMutation({
    mutationFn: Api.milestones.create,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.milestones.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.goals.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.userGoals.getAll,
        }),
      ]),
  });

  const onSubmit = async ({
    milestones,
    activity_id,
    name,
    reward,
    type,
    duration,
    goal_count,
    reward_per_item,
    schedule = "none",
  }: GoalFormValues) => {
    try {
      setIsSubmitting(true);
      switch (type) {
        case "count":
          await createGoal({
            activity_id,
            name,
            type,
            reward,
            reward_per_item,
            goal_count,
            schedule,
            user_id: user?.id ?? "",
          });
          break;
        case "milestone":
          const newGoals = await createGoal({
            activity_id,
            name,
            type,
            reward,
            schedule,
            user_id: user?.id ?? "",
          });

          if (milestones && newGoals[0]) {
            await createMilestones(
              milestones.map((milestone) => ({
                ...milestone,
                goal_id: newGoals[0].id,
                user_id: user?.id ?? "",
              })),
            );
          }
          break;
        case "time":
          await createGoal({
            activity_id,
            name,
            type,
            reward,
            goal_count,
            schedule,
            duration,
            user_id: user?.id ?? "",
          });
          break;
        default:
          break;
      }

      triggerNotification({ message: "Goal successfully created!" });
      router.replace("/(tabs)/goals/manage");
    } catch (error) {
      console.error("An error occured while creating a goal", error);
      triggerNotification({ type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView>
      <GoalForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </ScrollView>
  );
}

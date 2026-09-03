import Api from "@api";
import { useUserContext } from "@context";
import { GoalForm, GoalFormValues } from "@features/goals";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function CreateGoalScreen() {
  const router = useRouter();
  const { user } = useUserContext();

  const { mutateAsync: createGoal } = useMutation({
    mutationFn: Api.goals.create,
  });

  const { mutateAsync: createMilestones } = useMutation({
    mutationFn: Api.milestones.create,
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

      router.back();
    } catch (error) {
      console.error("An error occured while creating a goal", error);
    }
  };

  return (
    <ScrollView>
      <GoalForm onSubmit={onSubmit} />
    </ScrollView>
  );
}

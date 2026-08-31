import Api from "@api";
import { useUserContext } from "@context";
import { GoalForm, GoalFormValues } from "@features/goals";
import { IDraftMilestone, IMilestone } from "@local-types/goals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isNil } from "@utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";

export default function UpdateGoalScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";

  const { data: goal } = useQuery({
    queryKey: ["goal", id],
    queryFn: () => Api.goals.getById(Number(id), userId),
  });

  const { mutateAsync: updateGoal } = useMutation({
    mutationFn: (goal: GoalFormValues) => Api.goals.update(Number(id), goal),
  });

  const { mutateAsync: createMilestones } = useMutation({
    mutationFn: Api.milestones.create,
  });

  const { mutateAsync: udpateMilestone } = useMutation({
    mutationFn: (milestone: Partial<IMilestone> & { id: number }) =>
      Api.milestones.update(milestone.id, milestone),
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
          await updateGoal({
            activity_id,
            name,
            type,
            reward,
            reward_per_item,
            goal_count,
            schedule,
          });
          break;
        case "milestone":
          if (!goal) {
            console.error("The goal was not yet fetched");
            return;
          }

          if (!milestones) break;

          if (milestones) {
            const newMilestones = milestones.filter((m) => isNil(m.id));
            const existingMilestones = milestones.filter(
              (m) => !isNil(m.id),
            ) as ({ id: number } & IDraftMilestone)[];

            await Promise.all([
              createMilestones(
                newMilestones.map((milestone) => ({
                  ...milestone,
                  goal_id: Number(id),
                  user_id: user?.id ?? "",
                })),
              ),
              ...existingMilestones.map((m) => udpateMilestone(m)),
            ]);
          }
          break;
        case "time":
          await updateGoal({
            activity_id,
            name,
            type,
            reward,
            goal_count,
            schedule,
            duration,
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
      <GoalForm onSubmit={onSubmit} defaultValues={goal} />
    </ScrollView>
  );
}

import Api from "@api";
import { IUserGoal } from "@local-types/goals";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export function useMarkUserGoalAsCompleted(userGoal: IUserGoal) {
  const { mutateAsync: updateUserGoal } = useMutation({
    mutationFn: (payload: Partial<IUserGoal>) =>
      Api.userGoals.update(userGoal.id, payload),
  });

  const { mutateAsync: updateUserPoints } = useMutation({
    mutationFn: Api.userData.updatePoints,
  });

  return useCallback(async () => {
    try {
      switch (userGoal.goal.type) {
        case "count":
          await updateUserGoal({ completed_count: userGoal.goal.goal_count });
          await updateUserPoints(
            userGoal.goal.reward +
              (userGoal.goal.goal_count - userGoal.completed_count) *
                userGoal.goal.reward_per_item,
          );
          break;
        case "time":
          await updateUserGoal({
            completed_duration: userGoal.goal.duration ?? undefined,
          });
          await updateUserPoints(userGoal.goal.reward);
          break;
        case "milestone":
          await updateUserGoal({
            completed_milestones: userGoal.goal.milestones.map((m) => m.id),
          });
          const milestonesRewardSum = userGoal.goal.milestones
            .filter((m) => !userGoal.completed_milestones.includes(m.id))
            .reduce((accumulator, current) => accumulator + current.reward, 0);

          await updateUserPoints(milestonesRewardSum + userGoal.goal.reward);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
}

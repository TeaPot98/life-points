import Api from "@api";
import { IUserGoal } from "@local-types/goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useQueryKeyStore } from "./userQueryKeys";

export function useMarkUserGoalAsCompleted() {
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutateAsync: updateUserGoal } = useMutation({
    mutationFn: (payload: Partial<IUserGoal> & { id: number }) =>
      Api.userGoals.update(payload.id, payload),
    onSuccess: async (_, { id }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getById(id),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getAll,
      });
    },
  });

  const { mutateAsync: updateUserPoints } = useMutation({
    mutationFn: Api.userData.updatePoints,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.userData.get,
      }),
  });

  return useCallback(
    async (userGoal: IUserGoal) => {
      try {
        switch (userGoal.goal.type) {
          case "count":
            await updateUserGoal({
              id: userGoal.id,
              // Set 0 so the next scheduled time the progress bar renders correctly
              // The current time period renders 100% based on the completed_at timestamp
              completed_count: 0,
              completed_at: dayjs().toISOString(),
            });
            await updateUserPoints(
              userGoal.goal.reward +
                (userGoal.goal.goal_count - userGoal.completed_count) *
                  userGoal.goal.reward_per_item,
            );
            break;
          case "time":
            await updateUserGoal({
              id: userGoal.id,
              completed_duration: userGoal.goal.duration ?? undefined,
              completed_at: dayjs().toISOString(),
            });
            await updateUserPoints(userGoal.goal.reward);
            break;
          case "milestone":
            await updateUserGoal({
              id: userGoal.id,
              completed_milestones: userGoal.goal.milestones.map((m) => m.id),
              completed_at: dayjs().toISOString(),
            });
            const milestonesRewardSum = userGoal.goal.milestones
              .filter((m) => !userGoal.completed_milestones.includes(m.id))
              .reduce(
                (accumulator, current) => accumulator + current.reward,
                0,
              );

            await updateUserPoints(milestonesRewardSum + userGoal.goal.reward);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [updateUserGoal, updateUserPoints],
  );
}

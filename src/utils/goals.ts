import { IUserGoal } from "@local-types/goals";
import dayjs from "dayjs";
import { isNil } from "./misc";

export function computeGoalCompletionPercentage(userGoal: IUserGoal) {
  const goalType = userGoal.goal.type;

  switch (goalType) {
    case "count":
      if (isNil(userGoal.completed_count)) return null;

      return (userGoal.completed_count * 100) / userGoal.goal.goal_count;
    case "time":
      if (isNil(userGoal.started_at) || isNil(userGoal.goal.duration))
        return null;

      const diffInSeconds = dayjs(userGoal.started_at).diff() / 1000;

      return Math.min(
        (Math.abs(diffInSeconds) * 100) / userGoal.goal.duration,
        100,
      );
    case "milestone":
      if (!userGoal.goal.milestones.length) return 0;

      return (
        (userGoal.completed_milestones.length * 100) /
        userGoal.goal.milestones.length
      );
    default:
      return null;
  }
}

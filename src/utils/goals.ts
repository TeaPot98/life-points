import dayjs from "dayjs";
import { IUserGoal } from "../types/goals";
import { isNil } from "./misc";

export function computeGoalCompletionPercentage(userGoal: IUserGoal) {
  const goalType = userGoal.goal.type;

  switch (goalType) {
    case "count":
      if (isNil(userGoal.completed_count)) return null;

      if (userGoal.goal.schedule === "none" && userGoal.completed_at)
        return 100;

      if (userGoal.goal.schedule !== "none" && userGoal.completed_at) {
        const isSameDay = dayjs().isSame(userGoal.completed_at, "day");
        const isSameWeek = dayjs().isSame(userGoal.completed_at, "week");
        const isSameMonth = dayjs().isSame(userGoal.completed_at, "month");
        const isSameYear = dayjs().isSame(userGoal.completed_at, "year");

        if (
          (isSameDay && userGoal.goal.schedule === "daily") ||
          (isSameWeek && userGoal.goal.schedule === "weekly") ||
          (isSameMonth && userGoal.goal.schedule === "monthly") ||
          (isSameYear && userGoal.goal.schedule === "yearly")
        )
          return 100;
      }

      return Math.min(
        100,
        (userGoal.completed_count * 100) / userGoal.goal.goal_count,
      );

    case "time":
      if (isNil(userGoal.goal.duration)) return null;

      return Math.min(
        100,
        Math.max(
          0,
          ((userGoal.completed_duration ?? 0) * 100) / userGoal.goal.duration,
        ),
      );
    case "milestone":
      if (!userGoal.goal.milestones.length) return 0;

      return Math.min(
        100,
        (userGoal.completed_milestones.length * 100) /
          userGoal.goal.milestones.length,
      );
    default:
      return null;
  }
}

export function computeTimeGoalCompletion(
  startedAt: string,
  totalDuration: number,
) {
  const diffInSeconds = dayjs().diff(startedAt, "seconds");

  return Math.min(1, Math.max(0, diffInSeconds / totalDuration));
}

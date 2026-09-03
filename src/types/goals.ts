import { IActivity } from "./activities";
import { Database } from "./database";

export type GoalSchedule = Database["public"]["Enums"]["goal_schedule"];

export type GoalsUpdatePayload =
  Database["public"]["Tables"]["goals"]["Update"];

export type GoalsCreatePayload =
  Database["public"]["Tables"]["goals"]["Insert"];

export type MilestonesUpdatePayload =
  Database["public"]["Tables"]["milestones"]["Update"];

export type MilestonesCreatePayload =
  Database["public"]["Tables"]["milestones"]["Insert"];

export type IMilestone = Database["public"]["Tables"]["milestones"]["Row"];

export type IDraftMilestone = Pick<IMilestone, "name" | "reward"> & {
  id?: number;
};

export type IGoal = Database["public"]["Tables"]["goals"]["Row"] & {
  milestones: IMilestone[];
  activity: IActivity;
};

export type UserGoalsUpdatePayload =
  Database["public"]["Tables"]["user_goals"]["Update"];

export type UserGoalsCreatePayload =
  Database["public"]["Tables"]["user_goals"]["Insert"];

export type IUserGoal = Database["public"]["Tables"]["user_goals"]["Row"] & {
  goal: IGoal & { milestones: IMilestone[]; activity: IActivity };
};

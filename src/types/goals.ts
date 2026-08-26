import { Database } from "./database";

export enum GoalSchedule {
  None = 0,
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
  Yearly = 4,
}

export type GoalsUpdatePayload =
  Database["public"]["Tables"]["goals"]["Update"];

export type GoalsCreatePayload =
  Database["public"]["Tables"]["goals"]["Insert"];

export type MilestonesUpdatePayload =
  Database["public"]["Tables"]["milestones"]["Update"];

export type MilestonesCreatePayload =
  Database["public"]["Tables"]["milestones"]["Insert"];

export type IMilestone = Database["public"]["Tables"]["milestones"]["Row"];

export type IDraftMilestone = Pick<IMilestone, "name" | "reward">;

export type IGoal = Database["public"]["Tables"]["goals"]["Row"];

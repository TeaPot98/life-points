import { Database } from "./database";

export enum GoalSchedule {
  None = 0,
  Daily = 1,
  Weekly = 2,
  Yearly = 3,
}

export type GoalsUpdatePayload =
  Database["public"]["Tables"]["goals"]["Update"];

export type GoalsCreatePayload =
  Database["public"]["Tables"]["goals"]["Insert"];

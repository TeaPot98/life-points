import { Database } from "./database";

export interface Activity {
  name: string;
  /**
   * Link to icon location
   */
  icon: string;
  color: string;
  reward: number;
}

export enum ActivityType {
  Milestone = 0,
  Time = 1,
  Count = 2,
}

export type ActivitiesUpdatePayload =
  Database["public"]["Tables"]["activities"]["Update"];

export type ActivitiesCreatePayload =
  Database["public"]["Tables"]["activities"]["Insert"];

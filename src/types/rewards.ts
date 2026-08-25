import { Database } from "./database";

export type RewardsUpdatePayload =
  Database["public"]["Tables"]["rewards"]["Update"];

export type RewardsCreatePayload =
  Database["public"]["Tables"]["rewards"]["Insert"];

export type RewardActivitiesUpdatePayload =
  Database["public"]["Tables"]["reward_activities"]["Update"];

export type RewardActivitiesCreatePayload =
  Database["public"]["Tables"]["reward_activities"]["Insert"];

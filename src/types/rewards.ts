import { Database } from "./database";

export type RewardsUpdatePayload =
  Database["public"]["Tables"]["rewards"]["Update"];

export type RewardsCreatePayload =
  Database["public"]["Tables"]["rewards"]["Insert"];

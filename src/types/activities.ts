import { Database } from "./database";

export type IActivity = Database["public"]["Tables"]["activities"]["Row"];

export type ActivityType = Database["public"]["Enums"]["activity_type"];

export type ActivitiesUpdatePayload =
  Database["public"]["Tables"]["activities"]["Update"];

export type ActivitiesCreatePayload =
  Database["public"]["Tables"]["activities"]["Insert"];

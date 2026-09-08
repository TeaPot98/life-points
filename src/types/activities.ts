import { FixedColor } from "../theme/types";
import { Database } from "./database";
import { FontAwesomeName } from "./icons";

export type IActivity = Database["public"]["Tables"]["activities"]["Row"];

export type IDefaultActivity = IActivity & {
  user_id: "all";
  color: FixedColor;
  created_at: "local";
  icon: FontAwesomeName;
};

export type ActivityType = Database["public"]["Enums"]["activity_type"];

export type ActivitiesUpdatePayload =
  Database["public"]["Tables"]["activities"]["Update"];

export type ActivitiesCreatePayload =
  Database["public"]["Tables"]["activities"]["Insert"];

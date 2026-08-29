import { Database } from "./database";

export type UserDataUpdatePayload =
  Database["public"]["Tables"]["user_data"]["Update"];

export type UserDataCreatePayload =
  Database["public"]["Tables"]["user_data"]["Insert"];

export type IUserData = Database["public"]["Tables"]["user_data"]["Row"];

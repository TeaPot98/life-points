import {
  UserGoalsCreatePayload,
  UserGoalsUpdatePayload,
} from "@local-types/goals";
import { supabase } from "./supabase";

const userGoals = {
  async create(payload: UserGoalsCreatePayload) {
    const { data, error } = await supabase
      .from("user_goals")
      .insert(payload)
      .select();

    if (error) throw error;

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("user_goals")
      .select("*, goal:goals (*, milestones:milestones (*))")
      .eq("user_id", userId);

    console.log({ userId });

    if (error) throw error;

    return data;
  },
  async update(id: number, payload: UserGoalsUpdatePayload) {
    const { data, error } = await supabase
      .from("user_goals")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("user_goals")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default userGoals;

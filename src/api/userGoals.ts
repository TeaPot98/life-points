import {
  UserGoalsCreatePayload,
  UserGoalsUpdatePayload,
} from "../types/goals";
import { supabase } from "./supabase";

const userGoals = {
  async create(payload: UserGoalsCreatePayload) {
    const { data, error } = await supabase
      .from("user_goals")
      .insert(payload)
      .select();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("user_goals")
      .select(
        "*, goal:goals (*, milestones:milestones (*), activity:activities (*))",
      )
      .eq("user_id", userId);

    console.log({ userId });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getById(userGoalId: number, userId: string) {
    const { data, error } = await supabase
      .from("user_goals")
      .select(
        "*, goal:goals (*, milestones:milestones (*), activity:activities (*))",
      )
      .eq("id", userGoalId)
      .eq("user_id", userId)
      .single();

    console.log({ userId });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: UserGoalsUpdatePayload) {
    const { data, error } = await supabase
      .from("user_goals")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("user_goals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default userGoals;

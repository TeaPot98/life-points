import {
  RewardActivitiesCreatePayload,
  RewardActivitiesUpdatePayload,
} from "../types/rewards";
import { supabase } from "./supabase";

const rewardActivities = {
  async create(payload: RewardActivitiesCreatePayload) {
    const { data, error } = await supabase
      .from("reward_activities")
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("reward_activities")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getById(rewardActivityId: number, userId: string) {
    const { data, error } = await supabase
      .from("reward_activities")
      .select()
      .eq("id", rewardActivityId)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: RewardActivitiesUpdatePayload) {
    const { data, error } = await supabase
      .from("reward_activities")
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
      .from("reward_activities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default rewardActivities;

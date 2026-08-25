import {
  RewardActivitiesCreatePayload,
  RewardActivitiesUpdatePayload,
} from "@local-types/rewards";
import { supabase } from "./supabase";

const rewardActivities = {
  async create(payload: RewardActivitiesCreatePayload) {
    const { data, error } = await supabase
      .from("reward_activities")
      .insert(payload);

    if (error) throw error;

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("reward_activities")
      .select()
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },
  async update(id: number, payload: RewardActivitiesUpdatePayload) {
    const { data, error } = await supabase
      .from("reward_activities")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("reward_activities")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default rewardActivities;

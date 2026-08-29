import {
  UserRewardsCreatePayload,
  UserRewardsUpdatePayload,
} from "@local-types/rewards";
import { supabase } from "./supabase";

const userRewards = {
  async create(payload: UserRewardsCreatePayload) {
    const { data, error } = await supabase
      .from("user_rewards")
      .insert(payload)
      .select();

    if (error) throw error;

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("user_rewards")
      .select("*, reward:rewards (*, activity:reward_activities (*))")
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },
  async update(id: number, payload: UserRewardsUpdatePayload) {
    const { data, error } = await supabase
      .from("user_rewards")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("user_rewards")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default userRewards;

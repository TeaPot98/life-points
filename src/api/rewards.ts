import {
  RewardsCreatePayload,
  RewardsUpdatePayload,
} from "@local-types/rewards";
import { supabase } from "./supabase";

const rewards = {
  async create(payload: RewardsCreatePayload) {
    const { data, error } = await supabase.from("rewards").insert(payload);

    if (error) throw error;

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("rewards")
      .select()
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },
  async update(id: number, payload: RewardsUpdatePayload) {
    const { data, error } = await supabase
      .from("rewards")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("rewards")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default rewards;

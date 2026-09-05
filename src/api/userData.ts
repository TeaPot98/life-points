import {
  UserDataCreatePayload,
  UserDataUpdatePayload,
} from "@local-types/user";
import { supabase } from "./supabase";

const userData = {
  async create(payload: UserDataCreatePayload) {
    const { data, error } = await supabase
      .from("user_data")
      .upsert(payload, { onConflict: "user_id", ignoreDuplicates: true })
      .select();

    if (error) {
      console.error(error);
      throw error;
    }

    return data?.[0];
  },
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("user_data")
      .select()
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async updatePoints(diffAmount: number) {
    const { data, error } = await supabase.rpc("update_user_points", {
      increment_amount: diffAmount,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: UserDataUpdatePayload) {
    const { data, error } = await supabase
      .from("user_data")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default userData;

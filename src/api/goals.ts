import { GoalsCreatePayload, GoalsUpdatePayload } from "@local-types/goals";
import { supabase } from "./supabase";

const goals = {
  async create(payload: GoalsCreatePayload) {
    const { data, error } = await supabase
      .from("goals")
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
      .from("goals")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: GoalsUpdatePayload) {
    const { data, error } = await supabase
      .from("goals")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase.from("goals").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default goals;

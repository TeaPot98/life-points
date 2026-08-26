import {
  MilestonesCreatePayload,
  MilestonesUpdatePayload,
} from "@local-types/goals";
import { supabase } from "./supabase";

const milestones = {
  async create(payload: MilestonesCreatePayload | MilestonesCreatePayload[]) {
    const { data, error } = await supabase.from("milestones").insert(payload);

    if (error) throw error;

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("milestones")
      .select()
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },
  async update(id: number, payload: MilestonesUpdatePayload) {
    const { data, error } = await supabase
      .from("milestones")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("milestones")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default milestones;

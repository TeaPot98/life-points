import {
  ActivitiesCreatePayload,
  ActivitiesUpdatePayload,
} from "@local-types/activities";
import { supabase } from "./supabase";

const activities = {
  async create(payload: ActivitiesCreatePayload) {
    const { data, error } = await supabase.from("activities").insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("activities")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: ActivitiesUpdatePayload) {
    const { data, error } = await supabase
      .from("activities")
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
      .from("activities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default activities;

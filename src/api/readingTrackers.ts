import {
  ReadingTrackerCreatePayload,
  ReadingTrackerUpdatePayload,
} from "@local-types/books";
import { supabase } from "./supabase";

const readingTracker = {
  async create(payload: ReadingTrackerCreatePayload) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .insert(payload)
      .select();

    if (error) throw error;

    return data?.[0];
  },
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .select()
      .eq("user_id", userId);

    if (error) throw error;

    return data?.[0];
  },
  async update(id: number, payload: ReadingTrackerUpdatePayload) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .update(payload)
      .eq("id", id);

    if (error) throw error;

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return data;
  },
};

export default readingTracker;

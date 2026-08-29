import {
  ReadingTrackerCreatePayload,
  ReadingTrackerUpdatePayload,
} from "@local-types/books";
import { isNil } from "@utils";
import { supabase } from "./supabase";

const readingTracker = {
  async create(payload: ReadingTrackerCreatePayload) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .insert(payload)
      .select();

    if (error) {
      console.error(error);
      throw error;
    }

    return data?.[0];
  },
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },

  async getStatistics(userId: string) {
    const [
      { data: readingTracker, error: readingTrackerError },
      { count: totalBooks, error: totalBooksError },
    ] = await Promise.all([
      supabase
        .from("reading_trackers")
        .select("*, last_book:books (*)")
        .eq("user_id", userId)
        .single(),
      supabase
        .from("books")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", userId),
    ]);

    if (readingTrackerError) {
      console.error(readingTrackerError);
      throw readingTrackerError;
    }

    if (totalBooksError) {
      console.error(totalBooksError);
      throw totalBooksError;
    }

    if (isNil(readingTracker)) return;

    return { ...readingTracker, total_books: totalBooks ?? 0 };
  },
  async update(id: number, payload: ReadingTrackerUpdatePayload) {
    const { data, error } = await supabase
      .from("reading_trackers")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default readingTracker;

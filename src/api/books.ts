import { BooksCreatePayload, BooksUpdatePayload } from "../types/books";
import { supabase } from "./supabase";

const books = {
  async create(payload: BooksCreatePayload) {
    const { data, error } = await supabase
      .from("books")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from("books")
      .select()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async getById(bookId: number, userId: string) {
    const { data, error } = await supabase
      .from("books")
      .select()
      .eq("id", bookId)
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async update(id: number, payload: BooksUpdatePayload) {
    const { data, error } = await supabase
      .from("books")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
  async delete(id: number) {
    const { data, error } = await supabase.from("books").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  },
};

export default books;

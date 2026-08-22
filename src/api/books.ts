import { supabase } from "./supabase";

const books = {
  getAll() {
    return supabase.from("books").select();
  },
};

export default books;

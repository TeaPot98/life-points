import auth from "./auth";
import books from "./books";

export * from "./supabase";

const Api = {
  books,
  auth,
};

export default Api;

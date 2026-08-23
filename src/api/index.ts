import activities from "./activities";
import auth from "./auth";
import books from "./books";
import rewards from "./rewards";

export * from "./supabase";

const Api = {
  books,
  auth,
  rewards,
  activities,
};

export default Api;

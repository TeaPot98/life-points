import activities from "./activities";
import auth from "./auth";
import books from "./books";
import goals from "./goals";
import rewards from "./rewards";

export * from "./supabase";

const Api = {
  books,
  auth,
  rewards,
  activities,
  goals,
};

export default Api;

import activities from "./activities";
import auth from "./auth";
import books from "./books";
import goals from "./goals";
import mielestones from "./milestones";
import rewardActivities from "./reward-activities";
import rewards from "./rewards";

export * from "./supabase";

const Api = {
  books,
  auth,
  rewards,
  activities,
  goals,
  mielestones,
  rewardActivities,
};

export default Api;

import activities from "./activities";
import auth from "./auth";
import books from "./books";
import goals from "./goals";
import milestones from "./milestones";
import rewardActivities from "./reward-activities";
import rewards from "./rewards";

export * from "./supabase";

const Api = {
  books,
  auth,
  rewards,
  activities,
  goals,
  milestones,
  rewardActivities,
};

export default Api;

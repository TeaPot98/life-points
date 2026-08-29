import activities from "./activities";
import auth from "./auth";
import books from "./books";
import goals from "./goals";
import milestones from "./milestones";
import readingTracker from "./readingTrackers";
import rewardActivities from "./reward-activities";
import rewards from "./rewards";
import userData from "./userData";
import userGoals from "./userGoals";
import userRewards from "./userRewards";

export * from "./supabase";

const Api = {
  books,
  auth,
  rewards,
  activities,
  goals,
  milestones,
  rewardActivities,
  readingTracker,
  userGoals,
  userRewards,
  userData,
};

export default Api;

import { Database } from "./database";

export type RewardsUpdatePayload =
  Database["public"]["Tables"]["rewards"]["Update"];

export type RewardsCreatePayload =
  Database["public"]["Tables"]["rewards"]["Insert"];

export type RewardActivitiesUpdatePayload =
  Database["public"]["Tables"]["reward_activities"]["Update"];

export type RewardActivitiesCreatePayload =
  Database["public"]["Tables"]["reward_activities"]["Insert"];

export type UserRewardsUpdatePayload =
  Database["public"]["Tables"]["user_rewards"]["Update"];

export type UserRewardsCreatePayload =
  Database["public"]["Tables"]["user_rewards"]["Insert"];

export type IRewardActivity =
  Database["public"]["Tables"]["reward_activities"]["Row"];

export type IReward = Database["public"]["Tables"]["rewards"]["Row"] & {
  activity: IRewardActivity;
};

export type IUserReward =
  Database["public"]["Tables"]["user_rewards"]["Row"] & {
    reward: IReward;
  };

import { IDefaultRewardActivity } from "../types/rewards";

export const DEFAULT_REWARD_ACTIVITIES = [
  {
    id: -1,
    created_at: "local",
    user_id: "all",
    name: "Watch a Movie",
    color: "blue",
    icon: "video-camera",
  },
  {
    id: -2,
    created_at: "local",
    user_id: "all",
    name: "Play Video Games",
    color: "green",
    icon: "gamepad",
  },
  {
    id: -3,
    created_at: "local",
    user_id: "all",
    name: "Watch Series",
    color: "pink",
    icon: "television",
  },
  {
    id: -4,
    created_at: "local",
    user_id: "all",
    name: "Social Media",
    color: "yellow",
    icon: "mobile-phone",
  },
  {
    id: -5,
    created_at: "local",
    user_id: "all",
    name: "Order Food",
    color: "red",
    icon: "apple",
  },
] satisfies IDefaultRewardActivity[];

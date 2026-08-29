import { IUserGoal } from "@local-types/goals";

export const countUserGoal = {
  id: 1,
  goal_id: 101,
  user_id: "user-1",
  created_at: "2026-08-20T08:00:00.000Z",
  started_at: "2026-08-29T07:00:00.000Z",

  completed_count: 6,
  completed_duration: 0,
  completed_milestones: [],

  goal: {
    id: 101,
    activity_id: 1,
    user_id: "user-1",
    created_at: "2026-08-15T10:00:00.000Z",

    name: "Read 20 pages",
    type: "count",
    schedule: "daily",

    goal_count: 10,
    duration: null,

    reward: 50,
    reward_per_item: 2,

    milestones: [],
  },
} satisfies IUserGoal;

export const timeUserGoal = {
  id: 2,
  goal_id: 102,
  user_id: "user-1",
  created_at: "2026-08-21T08:00:00.000Z",
  started_at: "2026-08-29T06:30:00.000Z",

  completed_count: 0,
  completed_duration: 25,
  completed_milestones: [],

  goal: {
    id: 102,
    activity_id: 2,
    user_id: "user-1",
    created_at: "2026-08-16T10:00:00.000Z",

    name: "Practice guitar",
    type: "time",
    schedule: "daily",

    goal_count: 0,
    duration: 1800,

    reward: 100,
    reward_per_item: 0,

    milestones: [],
  },
} satisfies IUserGoal;

export const milestoneUserGoal = {
  id: 3,
  goal_id: 103,
  user_id: "user-1",
  created_at: "2026-08-22T08:00:00.000Z",
  started_at: "2026-08-25T09:00:00.000Z",

  completed_count: 0,
  completed_duration: 0,
  completed_milestones: [301, 302],

  goal: {
    id: 103,
    activity_id: 3,
    user_id: "user-1",
    created_at: "2026-08-17T10:00:00.000Z",

    name: "Finish TypeScript course",
    type: "milestone",
    schedule: "none",

    goal_count: 0,
    duration: null,

    reward: 250,
    reward_per_item: 0,

    milestones: [
      {
        id: 301,
        goal_id: 103,
        user_id: "user-1",
        created_at: "2026-08-17T10:05:00.000Z",
        completed_at: "2026-08-25T12:00:00.000Z",
        name: "Finish fundamentals module",
        reward: 50,
      },
      {
        id: 302,
        goal_id: 103,
        user_id: "user-1",
        created_at: "2026-08-17T10:06:00.000Z",
        completed_at: "2026-08-27T14:00:00.000Z",
        name: "Build first project",
        reward: 75,
      },
      {
        id: 303,
        goal_id: 103,
        user_id: "user-1",
        created_at: "2026-08-17T10:07:00.000Z",
        completed_at: null,
        name: "Finish advanced types module",
        reward: 125,
      },
    ],
  },
} satisfies IUserGoal;

export const mockUserGoals: IUserGoal[] = [
  countUserGoal,
  timeUserGoal,
  milestoneUserGoal,
];

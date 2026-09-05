import Api from "@api";
import { useUserContext } from "@context";
import { QueryKey } from "@tanstack/react-query";
import { useMemo } from "react";

type QueryKeyStore = Partial<
  Record<
    keyof typeof Api,
    Record<string, QueryKey | ((...args: any[]) => QueryKey)>
  >
>;

export function useQueryKeyStore() {
  const { user } = useUserContext();

  return useMemo(
    () =>
      ({
        readingTracker: {
          readingStatistics: ["reading-statistics", user?.id],
          tracker: ["reading-tracker", user?.id],
        },
        userGoals: {
          getAll: ["user-goals", user?.id],
          getById: (id: number) => ["user-goals", user?.id, id],
        },
        goals: {
          getAll: ["goals", user?.id],
          getById: (id: number) => ["goals", user?.id, id],
        },
        milestones: {
          getAll: ["milestones", user?.id],
        },
        activities: {
          getAll: ["activities", user?.id],
          getById: (id: number) => ["activities", user?.id, id],
        },
        books: {
          getAll: ["books", user?.id],
          getById: (id: number) => ["books", user?.id, id],
        },
        rewardActivities: {
          getAll: ["reward-activities", user?.id],
          getById: (id: number) => ["reward-activities", user?.id, id],
        },
        userRewards: {
          getAll: ["user-rewards", user?.id],
          getById: (id: number) => ["user-rewards", user?.id, id],
        },
        rewards: {
          getAll: ["rewards", user?.id],
          getById: (id: number) => ["rewards", user?.id, id],
        },
        userData: {
          get: ["user-data", user?.id],
        },
      }) as const satisfies QueryKeyStore,
    [user?.id],
  );
}

import { Database } from "./database";

export interface Activity {
  name: string;
  /**
   * Link to icon location
   */
  icon: string;
  color: string;
  reward: number;
}

interface ReadingTracker {
  latestBook: Book;
  books: Book[];
  rewardPerPage: number;
}

interface Book {
  title: string;
  author: string;
  numberOfPages: number;
  readPages: number;
}

interface TimeActivity extends Activity {
  type: ActivityType.Time;
}

interface MilestoneActivity extends Activity {
  type: ActivityType.Milestone;
  milestones: Milestone[];
}

interface CountActivity extends Activity {
  type: ActivityType.Count;
}

interface Milestone {
  name: string;
  reward: number;
}

interface TimeActivityInstance extends TimeActivity {
  /**
   * Duration in minutes
   */
  duration: number;
}

enum ActivityType {
  Milestone,
  Time,
  Count,
}

export type ActivitiesUpdatePayload =
  Database["public"]["Tables"]["activities"]["Update"];

export type ActivitiesCreatePayload =
  Database["public"]["Tables"]["activities"]["Insert"];

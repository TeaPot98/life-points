import { SelectMenuOption } from "../components/inputs";
import { ActivityType } from "../types/activities";
import { FontAwesomeName } from "../types/icons";

export const GOAL_SCHEDULE_OPTIONS = [
  {
    title: "None",
    value: "none",
  },
  {
    title: "Daily",
    value: "daily",
  },
  {
    title: "Weekly",
    value: "weekly",
  },
  {
    title: "Monthly",
    value: "monthly",
  },
  {
    title: "Yearly",
    value: "yearly",
  },
] satisfies SelectMenuOption[];

export const ACTIVITY_TYPE_ICONS = {
  time: "hourglass-2",
  count: "outdent",
  milestone: "flag",
} satisfies Record<ActivityType, FontAwesomeName>;

export const DURATION_OPTIONS = [
  { title: "15m", value: 900 },
  { title: "30m", value: 1800 },
  { title: "1h", value: 3600 },
  { title: "1h 30m", value: 5400 },
  { title: "2h", value: 7200 },
  { title: "2h 30m", value: 9000 },
  { title: "3h", value: 10800 },
  { title: "4h", value: 14400 },
  { title: "5h", value: 18000 },
  { title: "6h", value: 21600 },
] satisfies SelectMenuOption<number>[];

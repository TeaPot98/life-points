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

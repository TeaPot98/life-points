import { GoalSchedule } from "@local-types/goals";
import { PickerItemProps } from "@react-native-picker/picker";

export const GOAL_SCHEDULE_OPTIONS = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Daily",
    value: "daily",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
] satisfies PickerItemProps<GoalSchedule>[];

import { GoalSchedule } from "@local-types/goals";
import { PickerItemProps } from "@react-native-picker/picker";

export const GOAL_SCHEDULE_OPTIONS = [
  {
    label: "None",
    value: GoalSchedule.None,
  },
  {
    label: "Daily",
    value: GoalSchedule.Daily,
  },
  {
    label: "Weekly",
    value: GoalSchedule.Weekly,
  },
  {
    label: "Monthly",
    value: GoalSchedule.Monthly,
  },
  {
    label: "Yearly",
    value: GoalSchedule.Yearly,
  },
] satisfies PickerItemProps<number>[];

import {
  ControlledNumberInput,
  ControlledSelectMenu,
} from "@components/inputs";

import { GOAL_SCHEDULE_OPTIONS } from "@constants";
import { GoalSchedule } from "@local-types/goals";
import { useFormContext } from "react-hook-form";

interface TimeBasedFields {
  duration?: number;
  reward: number;
  schedule?: GoalSchedule;
}

export const TimeBasedGoalForm = () => {
  const { control } = useFormContext<TimeBasedFields>();

  return (
    <>
      <ControlledNumberInput
        control={control}
        name="duration"
        inputProps={{ label: "Duration" }}
      />
      <ControlledSelectMenu
        control={control}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
        selectProps={{ label: "Schedule" }}
      />
      <ControlledNumberInput
        control={control}
        name="reward"
        inputProps={{ label: "Reward" }}
      />
    </>
  );
};

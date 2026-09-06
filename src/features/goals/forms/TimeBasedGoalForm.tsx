import {
  ControlledNumberInput,
  ControlledSelectMenu,
} from "../../../components/inputs";

import { useFormContext } from "react-hook-form";
import { DURATION_OPTIONS, GOAL_SCHEDULE_OPTIONS } from "../../../constants";
import { GoalSchedule } from "../../../types/goals";

interface TimeBasedFields {
  duration: number;
  reward: number;
  schedule?: GoalSchedule;
}

export const TimeBasedGoalForm = () => {
  const { control } = useFormContext<TimeBasedFields>();

  return (
    <>
      <ControlledSelectMenu
        // @ts-ignore TODO: fix this
        control={control}
        name="duration"
        inputProps={{ label: "Duration" }}
        option={DURATION_OPTIONS}
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
        controllerProps={{
          rules: {
            min: { value: 0, message: "The value cannot be negative" },
          },
        }}
      />
    </>
  );
};

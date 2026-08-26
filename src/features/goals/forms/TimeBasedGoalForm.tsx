import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
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
      <ControlledTextInput
        control={control}
        name="duration"
        textInputPros={{ label: "Duration" }}
      />
      <ControlledPicker
        control={control}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
      />
      <ControlledTextInput
        control={control}
        name="reward"
        textInputPros={{ label: "Reward" }}
      />
    </>
  );
};

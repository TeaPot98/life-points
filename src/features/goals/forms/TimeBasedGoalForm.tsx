import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { GOAL_SCHEDULE_OPTIONS } from "@constants";
import { GoalSchedule } from "@local-types/goals";
import { Control } from "react-hook-form";

interface TimeBasedFields {
  duration?: number;
  reward: number;
  schedule?: GoalSchedule;
}

type TimeBasedGoalFormProps<T extends TimeBasedFields> = {
  control: Control<T>;
};

export const TimeBasedGoalForm = <T extends TimeBasedFields = TimeBasedFields>({
  control,
}: TimeBasedGoalFormProps<T>) => {
  return (
    <>
      <ControlledTextInput
        control={control as unknown as Control<TimeBasedFields>}
        name="duration"
        textInputPros={{ label: "icon" }}
      />
      <ControlledPicker
        control={control as unknown as Control<TimeBasedFields>}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
      />
      <ControlledTextInput
        control={control as unknown as Control<TimeBasedFields>}
        name="reward"
        textInputPros={{ label: "Reward" }}
      />
    </>
  );
};

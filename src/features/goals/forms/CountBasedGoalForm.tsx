import { ControlledNumericInput, ControlledPicker } from "@components/inputs";

import { GOAL_SCHEDULE_OPTIONS } from "@constants";
import { GoalSchedule } from "@local-types/goals";
import { useFormContext } from "react-hook-form";

interface CountBasedFields {
  reward: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
}

export const CountBasedGoalForm = () => {
  const { control } = useFormContext<CountBasedFields>();

  return (
    <>
      <ControlledNumericInput
        control={control}
        name="goal_count"
        inputProps={{ label: "Goal Count" }}
      />
      <ControlledPicker
        control={control}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
      />
      <ControlledNumericInput
        control={control}
        name="reward_per_item"
        inputProps={{ label: "Reward per Item" }}
      />
      <ControlledNumericInput
        control={control}
        name="reward"
        inputProps={{ label: "Final Reward" }}
      />
    </>
  );
};

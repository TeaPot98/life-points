import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
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
      <ControlledTextInput
        control={control}
        name="goal_count"
        textInputPros={{ label: "Goal Count" }}
      />
      <ControlledPicker
        control={control}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
      />
      <ControlledTextInput
        control={control}
        name="reward_per_item"
        textInputPros={{ label: "Reward per Item" }}
      />
      <ControlledTextInput
        control={control}
        name="reward"
        textInputPros={{ label: "Final Reward" }}
      />
    </>
  );
};

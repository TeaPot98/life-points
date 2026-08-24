import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { GOAL_SCHEDULE_OPTIONS } from "@constants";
import { GoalSchedule } from "@local-types/goals";
import { Control } from "react-hook-form";

interface CountBasedFields {
  reward: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
}

type CountBasedGoalFormProps<T extends CountBasedFields> = {
  control: Control<T>;
};

export const CountBasedGoalForm = <
  T extends CountBasedFields = CountBasedFields,
>({
  control,
}: CountBasedGoalFormProps<T>) => {
  return (
    <>
      <ControlledTextInput
        control={control as unknown as Control<CountBasedFields>}
        name="goal_count"
        textInputPros={{ label: "Goal Count" }}
      />
      <ControlledPicker
        control={control as unknown as Control<CountBasedFields>}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
      />
      <ControlledTextInput
        control={control as unknown as Control<CountBasedFields>}
        name="reward_per_item"
        textInputPros={{ label: "Reward per Item" }}
      />
      <ControlledTextInput
        control={control as unknown as Control<CountBasedFields>}
        name="reward"
        textInputPros={{ label: "Final Reward" }}
      />
    </>
  );
};

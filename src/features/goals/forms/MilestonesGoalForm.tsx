import { ControlledTextInput } from "@components/ControlledTextInput";
import { GoalSchedule } from "@local-types/goals";
import { Control } from "react-hook-form";

interface MilestonesFields {
  reward: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
}

type MilestonesGoalFormProps<T extends MilestonesFields> = {
  control: Control<T>;
};

export const MilestonesGoalForm = <
  T extends MilestonesFields = MilestonesFields,
>({
  control,
}: MilestonesGoalFormProps<T>) => {
  return (
    <>
      <ControlledTextInput
        control={control as unknown as Control<MilestonesFields>}
        name="goal_count"
        textInputPros={{ label: "Goal Count" }}
      />
      <ControlledTextInput
        control={control as unknown as Control<MilestonesFields>}
        name="reward"
        textInputPros={{ label: "Final Reward" }}
      />
    </>
  );
};

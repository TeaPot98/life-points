import {
  ControlledNumberInput,
  ControlledSelectMenu,
} from "../../../components/inputs";

import { GOAL_SCHEDULE_OPTIONS } from "../../../constants";
import { GoalSchedule } from "../../../types/goals";
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
      <ControlledNumberInput
        control={control}
        name="goal_count"
        inputProps={{ label: "Goal Count" }}
      />
      <ControlledSelectMenu
        control={control}
        name="schedule"
        options={GOAL_SCHEDULE_OPTIONS}
        selectProps={{ label: "Schedule" }}
      />
      <ControlledNumberInput
        control={control}
        name="reward_per_item"
        inputProps={{ label: "Reward per Item" }}
      />
      <ControlledNumberInput
        control={control}
        name="reward"
        inputProps={{ label: "Final Reward" }}
      />
    </>
  );
};

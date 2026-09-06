import {
  ControlledNumberInput,
  ControlledSelectMenu,
} from "../../../components/inputs";

import { useFormContext } from "react-hook-form";
import { GOAL_SCHEDULE_OPTIONS } from "../../../constants";
import { GoalSchedule } from "../../../types/goals";

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
        controllerProps={{
          rules: {
            min: {
              value: 1,
              message: "The value should be bigger than 0",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
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
        controllerProps={{
          rules: {
            min: {
              value: 0,
              message: "The value cannot be negative",
            },
          },
        }}
      />
      <ControlledNumberInput
        control={control}
        name="reward"
        inputProps={{ label: "Final Reward" }}
        controllerProps={{
          rules: {
            min: {
              value: 1,
              message: "The value should be bigger than 0",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
    </>
  );
};

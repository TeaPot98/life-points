import { ControlledTextInput } from "@components/ControlledTextInput";
import { IDraftMilestone } from "@local-types/goals";
import { useFormContext } from "react-hook-form";
import { MilestonesInput } from "../components";

interface MilestonesFields {
  reward: number;
  milestones: IDraftMilestone[];
}

export const MilestonesGoalForm = () => {
  const { control } = useFormContext<MilestonesFields>();

  return (
    <>
      <ControlledTextInput
        control={control}
        name="reward"
        textInputPros={{ label: "Final Reward" }}
      />
      <MilestonesInput control={control} />
    </>
  );
};

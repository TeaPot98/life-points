import { ControlledTextInput } from "@components/ControlledTextInput";
import { DraftMilestone } from "@local-types/goals";
import { useFormContext } from "react-hook-form";
import { MilestonesInput } from "../MilestonesInput";

interface MilestonesFields {
  reward: number;
  milestones: DraftMilestone[];
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

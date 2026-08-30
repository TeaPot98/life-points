import { ControlledNumericInput } from "@components/ControlledNumberInput";
import { IDraftMilestone } from "@local-types/goals";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MilestonesInput } from "../components";

interface MilestonesFields {
  reward: number;
  milestones: IDraftMilestone[];
}

export const MilestonesGoalForm = () => {
  const { control, watch } = useFormContext<MilestonesFields>();

  const watchMilestones = watch("milestones");

  useEffect(() => {
    console.log({ watchMilestones });
  }, [watchMilestones]);

  return (
    <>
      <ControlledNumericInput
        control={control}
        name="reward"
        textInputPros={{ label: "Final Reward" }}
      />
      <MilestonesInput control={control} />
    </>
  );
};

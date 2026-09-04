import { ControlledNumberInput } from "@components/inputs";
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
      <ControlledNumberInput
        control={control}
        name="reward"
        inputProps={{ label: "Final Reward" }}
      />
      <MilestonesInput control={control} />
    </>
  );
};

import Api from "@api";
import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { useUserContext } from "@context";
import { ActivityType } from "@local-types/activities";
import { GoalSchedule, IDraftMilestone } from "@local-types/goals";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { CountBasedGoalForm } from "./CountBasedGoalForm";
import { MilestonesGoalForm } from "./MilestonesGoalForm";
import { TimeBasedGoalForm } from "./TimeBasedGoalForm";

export type GoalFormValues = {
  activity_id: number;
  reward: number;
  type: ActivityType;
  name: string;
  duration?: number | null;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
  milestones?: IDraftMilestone[];
};

const activityTypeOptions = [
  {
    label: "Count",
    value: "count",
  },
  {
    label: "Time-based",
    value: "time",
  },
  {
    label: "Milestone",
    value: "milestone",
  },
] satisfies { label: string; value: ActivityType }[];

type GoalFormProps = {
  defaultValues?: GoalFormValues;
  onSubmit: (values: GoalFormValues) => void;
};

export const GoalForm = ({ onSubmit, defaultValues }: GoalFormProps) => {
  const { user } = useUserContext();
  const form = useForm<GoalFormValues>({
    defaultValues: defaultValues ?? { schedule: "none", type: "time" },
  });
  const { handleSubmit, control, watch, reset } = form;

  useEffect(() => {
    console.log("Reset form", { defaultValues });

    if (!defaultValues) return;
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { data: activities, isSuccess } = useQuery({
    queryKey: ["activities"],
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
  });

  useEffect(() => {
    if (defaultValues || !isSuccess || !activities?.length) return;

    reset((prev) => ({
      ...prev,
      activity_id: activities[0].id,
    }));
  }, [activities, defaultValues, isSuccess, reset]);

  const activitiesOptions = useMemo(
    () =>
      activities?.map((activity) => ({
        label: activity.name,
        value: activity.id,
      })) ?? [],
    [activities],
  );

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <ControlledTextInput
          control={control}
          name="name"
          textInputPros={{ label: "Name" }}
        />
        <ControlledPicker
          control={control}
          name="activity_id"
          options={activitiesOptions}
          pickerProps={{ enabled: !defaultValues }}
        />
        <ControlledPicker
          control={control}
          name="type"
          options={activityTypeOptions}
          pickerProps={{ enabled: !defaultValues }}
        />
        {watch("type") === "time" && <TimeBasedGoalForm />}
        {watch("type") === "count" && <CountBasedGoalForm />}
        {watch("type") === "milestone" && <MilestonesGoalForm />}
        <Button icon="plus" onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

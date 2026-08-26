import Api from "@api";
import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
import {
  CountBasedGoalForm,
  MilestonesGoalForm,
  TimeBasedGoalForm,
} from "@features/goals";
import { ActivityType } from "@local-types/activities";
import { GoalSchedule, IDraftMilestone } from "@local-types/goals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type FormFieldValues = {
  activity_id: number;
  reward: number;
  type: ActivityType;
  name: string;
  duration?: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
  milestones?: IDraftMilestone[];
};

const activityTypeOptions = [
  {
    label: "Count",
    value: ActivityType.Count,
  },
  {
    label: "Time-based",
    value: ActivityType.Time,
  },
  {
    label: "Milestone",
    value: ActivityType.Milestone,
  },
];

export default function CreateGoalScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const form = useForm<FormFieldValues>({
    defaultValues: { schedule: GoalSchedule.None, type: ActivityType.Time },
  });
  const { handleSubmit, control, watch, reset } = form;

  const { data: activities, isSuccess } = useQuery({
    queryKey: ["activities"],
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
  });

  const { mutateAsync: createGoal } = useMutation({
    mutationFn: Api.goals.create,
  });

  const { mutateAsync: createMilestones } = useMutation({
    mutationFn: Api.milestones.create,
  });

  useEffect(() => {
    if (!isSuccess || !activities?.length) return;

    reset((prev) => ({
      ...prev,
      activity_id: activities[0].id,
    }));
  }, [activities, isSuccess, reset]);

  const onSubmit = async ({
    milestones,
    activity_id,
    name,
    reward,
    type,
    duration,
    goal_count,
    reward_per_item,
    schedule,
  }: FormFieldValues) => {
    try {
      switch (type) {
        case ActivityType.Count:
          await createGoal({
            activity_id,
            name,
            type,
            reward,
            reward_per_item,
            goal_count,
            schedule,
            user_id: user?.id ?? "",
          });
          break;
        case ActivityType.Milestone:
          const newGoals = await createGoal({
            activity_id,
            name,
            type,
            reward,
            user_id: user?.id ?? "",
          });

          if (milestones && newGoals[0]) {
            await createMilestones(
              milestones.map((milestone) => ({
                ...milestone,
                goal_id: newGoals[0].id,
                user_id: user?.id ?? "",
              })),
            );
          }
          break;
        case ActivityType.Time:
          await createGoal({
            activity_id,
            name,
            type,
            reward,
            goal_count,
            schedule,
            duration,
            user_id: user?.id ?? "",
          });
          break;
        default:
          break;
      }

      router.back();
    } catch (error) {
      console.error("An error occured while creating a goal", error);
    }
  };

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
        />
        <ControlledPicker
          control={control}
          name="type"
          options={activityTypeOptions}
        />
        {watch("type") === ActivityType.Time && <TimeBasedGoalForm />}
        {watch("type") === ActivityType.Count && <CountBasedGoalForm />}
        {watch("type") === ActivityType.Milestone && <MilestonesGoalForm />}
        <Button icon="plus" onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

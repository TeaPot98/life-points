import Api from "@api";
import { ControlledPicker } from "@components/ControlledPicker";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
import {
  CountBasedGoalForm,
  MilestonesGoalForm,
  TimeBasedGoalForm,
} from "@features/goals";
import { ActivityType } from "@local-types/activities";
import { GoalSchedule } from "@local-types/goals";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type FormFieldValues = {
  activity_id: number;
  reward: number;
  type: ActivityType;
  duration?: number;
  reward_per_item?: number;
  schedule?: GoalSchedule;
  goal_count?: number;
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
  const { user } = useUserContext();
  const { handleSubmit, control, watch } = useForm<FormFieldValues>();

  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
  });

  const onSubmit = (values: FormFieldValues) => {
    Api.goals.create({ ...values, user_id: user?.id ?? "" });
  };

  const activitiesOptions = useMemo(
    () =>
      activities?.map((activity) => ({
        label: activity.name,
        value: activity.id,
      })) ?? [],
    [],
  );

  return (
    <View style={styles.container}>
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
      {watch("type") === ActivityType.Time && (
        <TimeBasedGoalForm control={control} />
      )}
      {watch("type") === ActivityType.Count && (
        <CountBasedGoalForm control={control} />
      )}
      {watch("type") === ActivityType.Milestone && (
        <MilestonesGoalForm control={control} />
      )}
      <Button icon="plus" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

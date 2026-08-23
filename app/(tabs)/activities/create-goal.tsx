import Api from "@api";
import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
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
  const { handleSubmit, control } = useForm<FormFieldValues>();

  const { data: activities, isLoading: isActivitiesLoading } = useQuery({
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
      <ControlledTextInput
        control={control}
        name="reward"
        textInputPros={{ label: "Reward" }}
      />
      <ControlledTextInput
        control={control}
        name="icon"
        textInputPros={{ label: "icon" }}
      />
      <ControlledTextInput
        control={control}
        name="color"
        textInputPros={{ label: "color" }}
      />
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

import Api from "../../../api";
import {
  ControlledSelectMenu,
  ControlledTextInput,
  SelectMenuOption,
} from "../../../components/inputs";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useQueryKeyStore } from "../../../api-hooks";
import { IconWithBackground } from "../../../components";
import { Button } from "../../../components/buttons";
import { useUserContext } from "../../../context";
import { useAppTheme } from "../../../theme";
import { ActivityType } from "../../../types/activities";
import { GoalSchedule, IDraftMilestone } from "../../../types/goals";
import { FontAwesomeName } from "../../../types/icons";
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

  const queryKeyStore = useQueryKeyStore();
  const activityTypeOptions = useActivityTypeOptions();

  useEffect(() => {
    console.log("Reset form", { defaultValues });

    if (!defaultValues) return;
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { data: activities, isSuccess } = useQuery({
    queryKey: queryKeyStore.activities.getAll,
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
      activities?.map(
        (activity) =>
          ({
            title: activity.name,
            value: activity.id,
            leadingIcon: ({ size }) => (
              <IconWithBackground
                name={activity.icon as FontAwesomeName}
                style={{ width: 40 }}
                iconSize={size}
              />
            ),
          }) satisfies SelectMenuOption<number>,
      ) ?? [],
    [activities],
  );

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <ControlledTextInput
          control={control}
          name="name"
          textInputPros={{ label: "Name" }}
          controllerProps={{
            rules: {
              required: {
                value: true,
                message: "This field is required",
              },
            },
          }}
        />
        <ControlledSelectMenu
          options={activitiesOptions}
          control={control}
          name="activity_id"
          selectProps={{ label: "Activity" }}
        />
        <ControlledSelectMenu
          control={control}
          name="type"
          options={activityTypeOptions}
          selectProps={{ disabled: !!defaultValues, label: "Goal Type" }}
        />
        {watch("type") === "time" && <TimeBasedGoalForm />}
        {watch("type") === "count" && <CountBasedGoalForm />}
        {watch("type") === "milestone" && <MilestonesGoalForm />}
        <Button onPress={handleSubmit(onSubmit)}>Save</Button>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
});

const useActivityTypeOptions = () => {
  const theme = useAppTheme();

  return useMemo(
    () =>
      [
        {
          title: "Count",
          value: "count",
          leadingIcon: ({ size }) => (
            <FontAwesome size={size} name="list" color={theme.colors.outline} />
          ),
        },
        {
          title: "Time-based",
          value: "time",
          leadingIcon: ({ size }) => (
            <FontAwesome
              size={size}
              name="hourglass"
              color={theme.colors.outline}
            />
          ),
        },
        {
          title: "Milestone",
          value: "milestone",
          leadingIcon: ({ size }) => (
            <FontAwesome size={size} name="flag" color={theme.colors.outline} />
          ),
        },
      ] satisfies SelectMenuOption[],
    [theme.colors.outline],
  );
};

import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { Button } from "../../../src/components/buttons";
import {
  ControlledSelectMenu,
  ControlledTextInput,
  SelectMenuOption,
} from "../../../src/components/inputs";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { DURATION_OPTIONS } from "../../../src/constants";
import { useUserContext } from "../../../src/context";

type FormFieldValues = {
  reward_activity_id: number;
  duration?: number;
  price: number;
};

export default function CreateRewardScreen() {
  const { user } = useUserContext();
  const { handleSubmit, control, reset } = useForm<FormFieldValues>();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutate: createReward } = useMutation({
    mutationFn: Api.rewards.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.rewards.getAll,
      }),
  });

  const { data: rewardActivities, isSuccess } = useQuery({
    queryKey: queryKeyStore.rewardActivities.getAll,
    queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
  });

  useEffect(() => {
    if (!isSuccess || !rewardActivities.length) return;

    reset((prev) => ({ ...prev, reward_activity_id: rewardActivities[0].id }));
  }, [isSuccess, reset, rewardActivities]);

  const onSubmit = (values: FormFieldValues) => {
    createReward({ ...values, user_id: user?.id ?? "" });
  };

  const rewardActivitiesOptions = useMemo(
    () =>
      rewardActivities?.map(
        (activity) =>
          ({
            title: activity.name,
            value: activity.id,
          }) satisfies SelectMenuOption<number>,
      ) ?? [],
    [rewardActivities],
  );

  return (
    <View style={styles.container}>
      <ControlledSelectMenu
        control={control}
        name="reward_activity_id"
        options={rewardActivitiesOptions}
        selectProps={{ label: "Activity" }}
      />
      <ControlledSelectMenu
        // @ts-ignore - Fix this
        control={control}
        name="duration"
        options={DURATION_OPTIONS}
        selectProps={{ label: "Duration" }}
      />
      <ControlledTextInput
        control={control}
        name="price"
        textInputPros={{ label: "Price" }}
        controllerProps={{
          rules: {
            min: {
              value: 1,
              message: "The value should be bigger than 1",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <Button icon="check" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 16,
  },
});

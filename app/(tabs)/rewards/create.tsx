import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { Button } from "../../../src/components/buttons";
import {
  ControlledNumberInput,
  ControlledSelectMenu,
  SelectMenuOption,
} from "../../../src/components/inputs";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { IconWithBackground } from "../../../src/components";
import { DURATION_OPTIONS } from "../../../src/constants";
import { useNotifications, useUserContext } from "../../../src/context";
import { FixedColor } from "../../../src/theme/types";
import { FontAwesomeName } from "../../../src/types/icons";

type FormFieldValues = {
  reward_activity_id: number;
  duration?: number;
  price: number;
};

export default function CreateRewardScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { handleSubmit, control, reset } = useForm<FormFieldValues>();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const { mutate: createReward, isPending: isCreateRewardPending } =
    useMutation({
      mutationFn: Api.rewards.create,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.rewards.getAll,
        });

        triggerNotification({ message: "Reward successfully created!" });

        router.replace("/(tabs)/rewards/shop");
      },
    });

  const {
    data: rewardActivities,
    isSuccess,
    isLoading: isRewardActivitiesLoading,
  } = useQuery({
    queryKey: queryKeyStore.rewardActivities.getAll,
    queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
    enabled: !!user,
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
            leadingIcon: ({ size }) => (
              <IconWithBackground
                name={activity.icon as FontAwesomeName}
                style={{ width: 40 }}
                iconSize={size}
                color={activity.color as FixedColor}
              />
            ),
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
        control={control}
        name="duration"
        options={DURATION_OPTIONS}
        selectProps={{ label: "Duration" }}
      />
      <ControlledNumberInput
        control={control}
        name="price"
        inputProps={{ label: "Price" }}
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
      <Button
        icon="check"
        onPress={handleSubmit(onSubmit)}
        loading={isCreateRewardPending || isRewardActivitiesLoading}
        disabled={isCreateRewardPending || isRewardActivitiesLoading}
      >
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

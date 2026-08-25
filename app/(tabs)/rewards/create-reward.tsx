import Api from "@api";
import { ControlledPicker } from "@components/ControlledPicker";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type FormFieldValues = {
  name: string;
  reward_activity_id: number;
  duration?: number;
  price: number;
};

export default function CreateRewardScreen() {
  const { user } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldValues>();

  const { data: rewardActivities } = useQuery({
    queryKey: ["reward-activities"],
    queryFn: () => Api.rewardActivities.getAll(user?.id ?? ""),
  });

  const onSubmit = (values: FormFieldValues) => {
    Api.rewards.create({ ...values, user_id: user?.id ?? "" });
  };

  const rewardActivitiesOptions = useMemo(
    () =>
      rewardActivities?.map((activity) => ({
        label: activity.name,
        value: activity.id,
      })) ?? [],
    [],
  );

  return (
    <View style={styles.container}>
      <ControlledPicker
        control={control}
        name="reward_activity_id"
        options={rewardActivitiesOptions}
      />
      <ControlledTextInput
        control={control}
        name="name"
        textInputPros={{ label: "Name" }}
      />
      <ControlledTextInput
        control={control}
        name="duration"
        textInputPros={{ label: "Duration (optional)" }}
      />
      <ControlledTextInput
        control={control}
        name="price"
        textInputPros={{ label: "Price" }}
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

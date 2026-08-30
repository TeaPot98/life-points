import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export type RewardActivityFormValues = {
  name: string;
  icon: string;
  color: string;
};

type RewardActivityFormProps = {
  defaultValues?: RewardActivityFormValues;
  onSubmit: (values: RewardActivityFormValues) => void;
};

export const RewardActivityForm = ({
  onSubmit,
  defaultValues,
}: RewardActivityFormProps) => {
  const { handleSubmit, control, reset } = useForm<RewardActivityFormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="name"
        textInputPros={{ label: "name" }}
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

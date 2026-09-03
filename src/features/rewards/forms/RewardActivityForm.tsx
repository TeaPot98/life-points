import { Button } from "@components/buttons";
import {
  ControlledColorSelect,
  ControlledIconSelect,
  ControlledTextInput,
} from "@components/inputs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

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
        textInputPros={{ label: "Name" }}
      />
      <ControlledIconSelect
        control={control}
        name="icon"
        selectProps={{ label: "Icon" }}
      />
      <ControlledColorSelect
        control={control}
        name="color"
        selectProps={{ label: "Color" }}
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
    padding: 16,
    gap: 8,
  },
});

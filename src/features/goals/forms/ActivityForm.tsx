import { Button } from "@components/buttons";
import {
  ControlledColorSelect,
  ControlledIconSelect,
  ControlledTextInput,
} from "@components/inputs";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export type ActivityFormValues = {
  name: string;
  icon: string;
  color: string;
};

type ActivityFormProps = {
  defaultValues?: ActivityFormValues;
  onSubmit: (values: ActivityFormValues) => void;
};

export const ActivityForm = ({
  onSubmit,
  defaultValues,
}: ActivityFormProps) => {
  const { handleSubmit, control, reset } = useForm<ActivityFormValues>({
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
      <Button icon="check" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
});

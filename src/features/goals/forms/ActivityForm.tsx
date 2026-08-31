import { ControlledTextInput } from "@components/inputs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

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

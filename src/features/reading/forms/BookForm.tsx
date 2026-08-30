import { ControlledNumericInput } from "@components/ControlledNumberInput";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export type BookFormValues = {
  title: string;
  author: string;
  number_of_pages: number;
  read_pages: number;
};

type BookFormProps = {
  onSubmit: (values: BookFormValues) => void;
  defaultValues?: BookFormValues;
};

export const BookForm = ({ onSubmit, defaultValues }: BookFormProps) => {
  const { handleSubmit, control, reset } = useForm<BookFormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="title"
        textInputPros={{ label: "Title" }}
      />
      <ControlledTextInput
        control={control}
        name="author"
        textInputPros={{ label: "Author" }}
      />
      <ControlledNumericInput
        control={control}
        name="number_of_pages"
        textInputPros={{ label: "Number of Pages" }}
      />
      <ControlledNumericInput
        control={control}
        name="read_pages"
        textInputPros={{ label: "Read Pages (optional)" }}
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

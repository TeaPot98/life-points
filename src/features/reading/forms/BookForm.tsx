import { Button } from "@components/buttons";
import { ControlledNumberInput, ControlledTextInput } from "@components/inputs";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

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
      <ControlledNumberInput
        control={control}
        name="number_of_pages"
        inputProps={{ label: "Number of Pages" }}
      />
      <ControlledNumberInput
        control={control}
        name="read_pages"
        inputProps={{ label: "Read Pages (optional)" }}
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

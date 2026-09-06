import { Button } from "../../../components/buttons";
import {
  ControlledNumberInput,
  ControlledTextInput,
} from "../../../components/inputs";

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
        controllerProps={{
          rules: {
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledTextInput
        control={control}
        name="author"
        textInputPros={{ label: "Author" }}
        controllerProps={{
          rules: {
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledNumberInput
        control={control}
        name="number_of_pages"
        inputProps={{ label: "Number of Pages" }}
        controllerProps={{
          rules: {
            min: {
              value: 1,
              message: "The value should be bigger than 0",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledNumberInput
        control={control}
        name="read_pages"
        inputProps={{ label: "Read Pages (optional)" }}
        controllerProps={{
          rules: {
            min: {
              value: 0,
              message: "The value should be bigger than 0",
            },
          },
        }}
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

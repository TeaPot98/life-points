import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

type ControlledTextInputProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  textInputPros?: Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;
};

export const ControlledTextInput = <T extends FieldValues = FieldValues>({
  control,
  controllerProps,
  name,
  textInputPros,
}: ControlledTextInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          mode="outlined"
          outlineStyle={styles.outline}
          {...textInputPros}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  outline: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 8,
  },
});

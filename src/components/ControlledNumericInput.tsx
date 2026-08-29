import { isNil } from "@utils";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPathByValue,
  FieldValues,
} from "react-hook-form";
import { TextInput, TextInputProps } from "react-native-paper";

type NumericPath<T extends FieldValues> =
  | FieldPathByValue<T, number>
  | FieldPathByValue<T, number | undefined>;

type ControlledNumericInputProps<
  T extends FieldValues,
  TName extends NumericPath<T>,
> = {
  control: Control<T>;
  name: TName;
  controllerProps?: Omit<
    ControllerProps<T, TName>,
    "name" | "control" | "render"
  >;
  textInputPros?: Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;
};

export const ControlledNumericInput = <
  T extends FieldValues,
  TName extends NumericPath<T>,
>({
  control,
  controllerProps,
  name,
  textInputPros,
}: ControlledNumericInputProps<T, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={isNil(value) ? "" : String(value)}
          onChangeText={(text) => {
            if (text === "") {
              onChange(undefined);
              return;
            }

            const parsed = Number(text);

            onChange(isNaN(parsed) ? undefined : parsed);
          }}
          onBlur={onBlur}
          keyboardType="numeric"
          {...textInputPros}
        />
      )}
    />
  );
};

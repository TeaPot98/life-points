import {
  Control,
  Controller,
  ControllerProps,
  FieldPathByValue,
  FieldValues,
} from "react-hook-form";
import { NumberInput, NumberInputProps } from "./NumberInput";

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
  inputProps?: Omit<NumberInputProps, "value" | "onChange" | "onBlur">;
};

export const ControlledNumericInput = <
  T extends FieldValues,
  TName extends NumericPath<T>,
>({
  control,
  controllerProps,
  name,
  inputProps,
}: ControlledNumericInputProps<T, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, onBlur, value } }) => (
        <NumberInput
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...inputProps}
        />
      )}
    />
  );
};

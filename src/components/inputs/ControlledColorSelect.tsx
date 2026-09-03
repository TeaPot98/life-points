import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { ColorSelect, ColorSelectProps } from "./ColorSelect";

type ControlledColorSelectProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  selectProps?: Partial<ColorSelectProps>;
};

export const ControlledColorSelect = <T extends FieldValues = FieldValues>({
  control,
  controllerProps,
  name,
  selectProps,
}: ControlledColorSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, value } }) => (
        <ColorSelect onValueChange={onChange} value={value} {...selectProps} />
      )}
    />
  );
};

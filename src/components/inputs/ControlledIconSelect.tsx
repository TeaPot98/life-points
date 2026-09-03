import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { IconSelect, IconSelectProps } from "./IconSelect";

type ControlledIconSelectProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  selectProps?: Partial<IconSelectProps>;
};

export const ControlledIconSelect = <T extends FieldValues = FieldValues>({
  control,
  controllerProps,
  name,
  selectProps,
}: ControlledIconSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, value } }) => (
        <IconSelect onValueChange={onChange} value={value} {...selectProps} />
      )}
    />
  );
};

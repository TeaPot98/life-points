import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { SelectMenu, SelectMenuOption, SelectMenuProps } from "./SelectMenu";

type ControlledSelectMenuProps<
  T extends FieldValues = FieldValues,
  V extends string | number = string,
> = {
  control: Control<T>;
  name: Path<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  options: SelectMenuOption<V>[];
  selectProps?: SelectMenuProps<V>;
};

export const ControlledSelectMenu = <
  T extends FieldValues = FieldValues,
  V extends string | number = string,
>({
  control,
  controllerProps,
  name,
  options,
  selectProps,
}: ControlledSelectMenuProps<T, V>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, value } }) => (
        <SelectMenu
          onValueChange={onChange}
          options={options}
          selectedOption={options.find((o) => o.value === value)}
          {...selectProps}
        />
      )}
    />
  );
};

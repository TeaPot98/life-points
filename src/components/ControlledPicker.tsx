import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

type ControlledPickerProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  pickerProps?: Omit<PickerProps, "selectedValue" | "onValueChange" | "onBlur">;
  options: PickerItemProps<string | number>[];
};

export const ControlledPicker = <T extends FieldValues = FieldValues>({
  control,
  controllerProps,
  name,
  pickerProps,
  options,
}: ControlledPickerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, onBlur, value } }) => (
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          onBlur={onBlur}
          {...pickerProps}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} {...option} />
          ))}
        </Picker>
      )}
    />
  );
};

import {
  Picker,
  PickerItemProps,
  PickerProps,
} from "@react-native-picker/picker";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";

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
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
            {...pickerProps}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                style={styles.item}
                color={theme.colors.outline}
                {...option}
              />
            ))}
          </Picker>
        </View>
      )}
    />
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      overflow: "visible",
      borderColor: theme.colors.outline,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderRadius: 8,
    },
    item: {},
  });

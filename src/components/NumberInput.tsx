import { isNil } from "@utils";
import { TextInput, TextInputProps } from "react-native-paper";

interface NumberInputProps extends Omit<
  TextInputProps,
  "value" | "onChange" | "keyboardType" | "onChangeText"
> {
  value: number | undefined | null;
  onChange: (value: number | "") => void;
}

export const NumberInput = ({
  value,
  onChange,
  ...props
}: NumberInputProps) => {
  return (
    <TextInput
      value={isNil(value) ? "" : String(value)}
      onChangeText={(text) => {
        if (text === "") {
          onChange("");
          return;
        }

        const parsed = Number(text);
        const value = isNaN(parsed) ? "" : parsed;

        onChange(value);
      }}
      keyboardType="numeric"
      {...props}
    />
  );
};

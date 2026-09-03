import { StyleSheet } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
} from "react-native-paper";

export type TextInputProps = Omit<PaperTextInputProps, "mode">;

export const TextInput = ({ outlineStyle, ...props }: TextInputProps) => {
  return (
    <PaperTextInput
      mode="outlined"
      outlineStyle={[styles.outline, outlineStyle]}
      {...props}
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

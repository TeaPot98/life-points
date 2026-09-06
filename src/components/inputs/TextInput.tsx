import { StyleSheet, View } from "react-native";
import {
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
  Text,
} from "react-native-paper";
import { useAppTheme } from "../../theme";
import { CustomTheme } from "../../theme/types";

export type TextInputProps = Omit<PaperTextInputProps, "mode"> & {
  errorMessage?: string;
};

export const TextInput = ({
  outlineStyle,
  errorMessage,
  ...props
}: TextInputProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme, !!errorMessage);

  return (
    <View>
      <PaperTextInput
        mode="outlined"
        outlineStyle={[styles.outline, outlineStyle]}
        {...props}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

const getStyles = (theme: CustomTheme, hasError: boolean) =>
  StyleSheet.create({
    outline: {
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderRadius: 8,
      ...(hasError ? { borderColor: theme.colors.error } : {}),
    },
    errorMessage: {
      color: theme.colors.error,
      fontSize: 12,
      marginLeft: 6,
    },
  });

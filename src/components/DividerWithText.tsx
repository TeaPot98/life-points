import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useAppTheme } from "../theme";
import { CustomTheme } from "../theme/types";

type DividerWithTextProps = {
  text: string;
};

export const DividerWithText = ({ text }: DividerWithTextProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.dividerContaienr}>
      <Divider style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    dividerContaienr: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      width: "100%",
    },
    dividerText: {
      fontWeight: "700",
      color: theme.colors.outline,
    },
    divider: {
      flex: 1,
      height: 2,
      backgroundColor: theme.colors.outline,
    },
  });

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../theme";
import { CustomTheme } from "../theme/types";

type NoDataProps = {
  message?: string;
  action?: ReactNode;
};

export const NoData = ({ action, message }: NoDataProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <FontAwesome name="file" size={36} color={theme.colors.onBackground} />
      <Text variant="bodyLarge" style={styles.message}>
        {message ?? "Looks like there is nothing here"}
      </Text>
      <View>{action}</View>
    </View>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: { alignItems: "center", gap: 16 },
    message: { color: theme.colors.onBackground },
  });

import { useContainerColors } from "@theme";
import { CoreColor } from "@theme/types";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ProgressBar as PaperProgressBar } from "react-native-paper";

type ProgressBarProps = {
  color?: CoreColor;
  value: number;
  style?: StyleProp<ViewStyle>;
};

export const ProgressBar = ({
  color = "secondary",
  value,
  style,
}: ProgressBarProps) => {
  const { container, onContainer: fill } = useContainerColors(color);

  const styles = getStyles({ container, fill });

  return (
    <PaperProgressBar
      animatedValue={value}
      style={[styles.container, style]}
      fillStyle={styles.fill}
    />
  );
};

const getStyles = (colors: { container: string; fill: string }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.container,
      height: 20,
      minWidth: 120,
      borderRadius: 10,
    },
    fill: {
      backgroundColor: colors.fill,
      height: "100%",
    },
  });

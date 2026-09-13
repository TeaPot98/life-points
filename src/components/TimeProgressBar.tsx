import { useEffect, useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ProgressBar as PaperProgressBar } from "react-native-paper";
import { useContainerColors } from "../theme";
import { CoreColor } from "../theme/types";
import { computeTimeGoalCompletion } from "../utils/goals";

type TimeProgressBarProps = {
  color?: CoreColor;
  startedAt: string | null;
  totalDuration: number;
  style?: StyleProp<ViewStyle>;
  onCompletion?: () => void;
  completed?: boolean;
};

const UDPATE_FREQUENCY = 4;

export const TimeProgressBar = ({
  color = "secondary",
  startedAt,
  totalDuration,
  style,
  completed,
  onCompletion,
}: TimeProgressBarProps) => {
  const { container, onContainer: fill } = useContainerColors(color);

  const styles = getStyles({ container, fill });

  const [value, setValue] = useState(completed ? 1 : 0);

  useEffect(() => {
    if (!startedAt || completed) return;

    if (value >= 1) {
      onCompletion?.();
      return;
    }

    const interval = setInterval(
      () => setValue(computeTimeGoalCompletion(startedAt, totalDuration)),
      1000 / UDPATE_FREQUENCY,
    );

    return () => clearInterval(interval);
  }, [completed, onCompletion, startedAt, totalDuration, value]);

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
      width: "100%",
    },
  });

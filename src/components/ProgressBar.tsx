import { StyleSheet } from "react-native";
import { View } from "./Themed";

const COLORS_MAP = {
  primary: {
    background: "#bbb",
    fill: "#444",
  },
} as const;

export const ProgressBar = ({
  color = "primary",
}: {
  color?: keyof typeof COLORS_MAP;
}) => {
  return (
    <View style={styles(color).container}>
      <View style={styles(color).fill}></View>
    </View>
  );
};

const styles = (color: keyof typeof COLORS_MAP) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS_MAP[color].background,
    },
    fill: {
      backgroundColor: COLORS_MAP[color].fill,
    },
  });

import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

const COLORS_MAP = {
  primary: {
    background: "#bbb",
    fill: "#444",
  },
} as const;

export const ProgressBar = ({
  color = "primary",
  percentage,
  style,
}: {
  color?: keyof typeof COLORS_MAP;
  percentage: number;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles(color).container, style]}>
      <View style={[styles(color).fill, { width: `${percentage}%` }]}></View>
    </View>
  );
};

const styles = (color: keyof typeof COLORS_MAP) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS_MAP[color].background,
      height: 20,
      minWidth: 120,
    },
    fill: {
      backgroundColor: COLORS_MAP[color].fill,
      height: "100%",
    },
  });

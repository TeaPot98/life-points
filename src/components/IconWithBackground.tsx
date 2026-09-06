import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesomeName } from "../types/icons";
import { useAppTheme } from "../theme";
import { CustomTheme, FixedColor } from "../theme/types";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type IconWithBackgroundProps = {
  name?: FontAwesomeName;
  color?: FixedColor;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
};

export const IconWithBackground = ({
  name,
  color = "primary",
  style,
  iconSize = 24,
}: IconWithBackgroundProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme, color);

  return (
    <View style={[styles.container, style]}>
      {name && <FontAwesome name={name} size={iconSize} style={styles.icon} />}
    </View>
  );
};

const getStyles = (theme: CustomTheme, color: FixedColor) =>
  StyleSheet.create({
    container: {
      aspectRatio: 1,
      width: 60,
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderBottomWidth: 4,
      borderRightWidth: 3,
      backgroundColor: theme.colors.fixed[color]?.main,
      borderColor: theme.colors.fixed[color]?.dark,
    },
    icon: {
      color: theme.colors.fixed[color]?.contrastText,
    },
  });

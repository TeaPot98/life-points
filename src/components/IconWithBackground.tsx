import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

type IconWithBackgroundProps = {
  name: ComponentProps<typeof FontAwesome>["name"];
  color?: keyof CustomTheme["colors"]["fixed"];
};

export const IconWithBackground = ({
  name,
  color = "primary",
}: IconWithBackgroundProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme, color);

  return (
    <View style={styles.container}>
      <FontAwesome name={name} size={24} style={styles.icon} />
    </View>
  );
};

const getStyles = (
  theme: CustomTheme,
  color: keyof CustomTheme["colors"]["fixed"],
) =>
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
      backgroundColor: theme.colors.fixed[color].main,
      borderColor: theme.colors.fixed[color].dark,
    },
    icon: {
      color: theme.colors.fixed[color].contrastText,
    },
  });

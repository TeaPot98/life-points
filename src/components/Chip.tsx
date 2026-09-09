import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Chip as PaperChip } from "react-native-paper";
import { getContainerColors, useAppTheme } from "../theme";
import { CoreColor, CustomTheme, FixedColor } from "../theme/types";
import { FontAwesomeName } from "../types/icons";
import { isFixedColor } from "../utils";

type PaperChipProps = Omit<ComponentProps<typeof PaperChip>, "icon"> & {
  color?: CoreColor | FixedColor;
  icon?: FontAwesomeName;
};

export const Chip = <T extends PaperChipProps>({
  color = "secondary",
  icon,
  ...props
}: T) => {
  const theme = useAppTheme();
  const styles = getStyles(color, theme);

  return (
    <PaperChip
      style={styles.container}
      textStyle={styles.text}
      icon={({ size }) => (
        <FontAwesome size={size} color={styles.icon.color} name={icon} />
      )}
      {...props}
    />
  );
};

const getStyles = (color: CoreColor | FixedColor, theme: CustomTheme) => {
  const { container, onContainer } = isFixedColor(color)
    ? {
        container: theme.colors.fixed[color].main,
        onContainer: theme.colors.fixed[color].dark,
      }
    : getContainerColors(color, theme);

  return StyleSheet.create({
    container: {
      backgroundColor: container,
      borderWidth: 1,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: onContainer,
    },
    text: { color: onContainer },
    icon: { color: onContainer },
  });
};

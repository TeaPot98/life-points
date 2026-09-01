import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesomeName } from "@local-types/icons";
import { getContainerColors, useAppTheme } from "@theme";
import { CoreColor, CustomTheme } from "@theme/types";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Chip as PaperChip } from "react-native-paper";

type PaperChipProps = Omit<ComponentProps<typeof PaperChip>, "icon"> & {
  color?: CoreColor;
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

const getStyles = (color: CoreColor, theme: CustomTheme) => {
  const { container, onContainer } = getContainerColors(color, theme);

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

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { IconButton as PaperIconButton } from "react-native-paper";
import { useContainerColors } from "../../theme";
import { CoreColor } from "../../theme/types";
import { FontAwesomeName } from "../../types/icons";

type PaperButtonProps = Omit<
  ComponentProps<typeof PaperIconButton>,
  "children" | "icon"
> & {
  color?: CoreColor;
  icon: FontAwesomeName;
  iconProps?: Omit<ComponentProps<typeof FontAwesome>, "name" | "color">;
};

export const IconButton = <T extends PaperButtonProps>({
  style,
  color = "primary",
  icon,
  iconProps,
  ...props
}: T) => {
  const containerColors = useContainerColors(color);
  const styles = getStyles(containerColors);

  return (
    <PaperIconButton
      style={[styles.button, style]}
      icon={() => (
        <FontAwesome
          name={icon}
          color={containerColors.onContainer}
          size={20}
          {...iconProps}
        />
      )}
      {...props}
    />
  );
};

const getStyles = ({
  container,
  onContainer,
}: {
  container: string;
  onContainer: string;
}) =>
  StyleSheet.create({
    button: {
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      backgroundColor: container,
      borderColor: onContainer,
      borderRadius: 12,
      aspectRatio: 1,
      width: 48,
      margin: 0,
    },
  });

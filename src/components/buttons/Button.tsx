import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { useContainerColors } from "../../theme";
import { CoreColor } from "../../theme/types";

type PaperButtonProps = ComponentProps<typeof PaperButton> & {
  color?: CoreColor;
};

export const Button = <T extends PaperButtonProps>({
  style,
  color = "primary",
  ...props
}: T) => {
  const containerColors = useContainerColors(color);

  return (
    <PaperButton
      textColor={containerColors.onContainer}
      uppercase
      {...props}
      style={[styles(containerColors).button, style]}
    />
  );
};

const styles = ({
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
    },
  });

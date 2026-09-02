import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Card as PaperCard } from "react-native-paper";

type PaperCardProps = ComponentProps<typeof PaperCard>;

export const Card = <T extends PaperCardProps>({
  mode,
  elevation,
  ...props
}: T) => {
  const theme = useAppTheme();

  return (
    <PaperCard
      {...props}
      mode="contained"
      style={[styles(theme).container, props.style]}
    >
      {props.children}
    </PaperCard>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.outline,
      borderBottomWidth: 4,
      borderRightWidth: 3,
    },
  });

Card.Content = PaperCard.Content;
Card.Actions = PaperCard.Actions;

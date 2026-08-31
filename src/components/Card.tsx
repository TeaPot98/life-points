import { CustomTheme, useAppTheme } from "@theme";
import { StyleSheet } from "react-native";
import { Card as PaperCard } from "react-native-paper";

type PaperCardProps = React.ComponentProps<typeof PaperCard>;

export const Card = <T extends PaperCardProps>({
  mode,
  elevation,
  ...props
}: T) => {
  const theme = useAppTheme();

  return (
    <PaperCard
      mode="contained"
      style={[styles(theme).container, props.style]}
      {...props}
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
      // borderWidth: 2,
    },
  });

Card.Content = PaperCard.Content;
Card.Actions = PaperCard.Actions;

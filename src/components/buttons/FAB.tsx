import { useAppTheme } from "../../theme";
import { CustomTheme } from "../../theme/types";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FABGroupProps, Portal, FAB as VanillaFAB } from "react-native-paper";

type FABProps = Omit<
  FABGroupProps,
  "visible" | "open" | "icon" | "onStateChange"
>;

export const FAB = ({ style, ...props }: FABProps) => {
  const theme = useAppTheme();
  const [{ open }, setState] = useState({ open: false });

  return (
    <Portal>
      <VanillaFAB.Group
        visible
        open={open}
        icon="plus"
        color={theme.colors.onPrimaryContainer}
        onStateChange={setState}
        variant="primary"
        style={[styles(theme).container, style]}
        fabStyle={styles(theme).fab}
        {...props}
      />
    </Portal>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      right: 0,
      bottom: 72,
    },
    fab: {
      color: "#fff",
      backgroundColor: theme.colors.primaryContainer,
      shadowColor: "transparent",
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderColor: theme.colors.onPrimaryContainer,
    },
  });

import { useState } from "react";
import { FABGroupProps, Portal, FAB as VanillaFAB } from "react-native-paper";

type FABProps = Omit<
  FABGroupProps,
  "visible" | "open" | "icon" | "onStateChange"
>;

export const FAB = ({ style, ...props }: FABProps) => {
  const [{ open }, setState] = useState({ open: false });

  return (
    <Portal>
      <VanillaFAB.Group
        visible
        open={open}
        icon="plus"
        onStateChange={setState}
        style={[{ position: "absolute", right: 0, bottom: 42 }, style]}
        {...props}
      />
    </Portal>
  );
};

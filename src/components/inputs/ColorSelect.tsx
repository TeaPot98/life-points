import { IconWithBackground } from "@components/IconWithBackground";
import { useAppTheme } from "@theme";
import { FixedColor } from "@theme/types";
import { formatCamelCase } from "@utils";
import { useMemo } from "react";
import { SelectMenu, SelectMenuOption, SelectMenuProps } from "./SelectMenu";

export type ColorSelectProps = Omit<
  SelectMenuProps,
  "options" | "selectedOption"
> & {
  value: FixedColor;
};

export const ColorSelect = ({ value, ...props }: ColorSelectProps) => {
  const colorOptions = useColorOptions();

  return (
    <SelectMenu
      options={colorOptions}
      selectedOption={colorOptions.find((o) => o.value === value)}
      {...props}
    />
  );
};

const useColorOptions = () => {
  const theme = useAppTheme();

  return useMemo(
    () =>
      Object.keys(theme.colors.fixed).map((color) => ({
        title: formatCamelCase(color),
        value: color as FixedColor,
        leadingIcon: ({ size }) => (
          <IconWithBackground
            style={{ width: 40 }}
            iconSize={size}
            color={color as FixedColor}
          />
        ),
      })) satisfies SelectMenuOption<FixedColor>[],
    [theme.colors.fixed],
  );
};

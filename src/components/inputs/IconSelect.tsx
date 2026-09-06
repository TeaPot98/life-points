import { IconWithBackground } from "../IconWithBackground";
import { FontAwesomeName } from "../../types/icons";
import { useMemo } from "react";
import { SelectMenu, SelectMenuOption, SelectMenuProps } from "./SelectMenu";

export type IconSelectProps = Omit<
  SelectMenuProps,
  "options" | "selectedOption"
> & {
  value: FontAwesomeName;
};

export const IconSelect = ({ value, ...props }: IconSelectProps) => {
  const iconOptions = useIconOptions();

  return (
    <SelectMenu
      options={iconOptions}
      selectedOption={iconOptions.find((o) => o.value === value)}
      {...props}
    />
  );
};

const useIconOptions = () => {
  return useMemo(
    () =>
      ICON_OPTIONS.map((icon) => ({
        title: icon,
        value: icon as FontAwesomeName,
        leadingIcon: ({ size }) => (
          <IconWithBackground
            style={{ width: 40 }}
            iconSize={size}
            name={icon as FontAwesomeName}
          />
        ),
      })) satisfies SelectMenuOption<FontAwesomeName>[],
    [],
  );
};

const ICON_OPTIONS = [
  "music",
  "heart",
  "star",
  "flag",
  "headphones",
  "book",
  "camera",
  "video-camera",
  "leaf",
  "plane",
  "sitemap",
  "coffee",
  "laptop",
  "mobile",
  "circle-o",
  "gamepad",
  "compass",
  "paw",
  "automobile",
  "futbol-o",
  "bicycle",
  "bed",
  "tv",
  "map-signs",
] satisfies FontAwesomeName[];

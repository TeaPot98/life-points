import { Button } from "../buttons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppTheme } from "../../theme";
import { CustomTheme } from "../../theme/types";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Menu, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type SelectMenuOption<T extends string | number = string> = {
  title: string;
  value: T;
  leadingIcon?: IconSource;
};

export type SelectMenuProps<T extends string | number = string> = {
  options: SelectMenuOption<T>[];
  selectedOption: SelectMenuOption<T> | undefined;
  onValueChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
};

export const SelectMenu = <T extends string | number = string>({
  options,
  selectedOption,
  onValueChange,
  placeholder = "Select a value",
  disabled = false,
  label,
}: SelectMenuProps<T>) => {
  const theme = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  const styles = getStyles(theme, isOpen);

  return (
    <Menu
      visible={isOpen}
      onDismiss={() => setIsOpen(false)}
      contentStyle={styles.menuContent}
      anchor={
        <View style={styles.buttonWrapper}>
          {label && <Text style={styles.label}>{label}</Text>}
          <Button
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon={selectedOption?.leadingIcon}
            onPress={() => setIsOpen((prev) => !prev)}
            disabled={disabled}
          >
            <View style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>
                {selectedOption?.title ?? placeholder}
              </Text>
              <FontAwesome
                size={16}
                color={theme.colors.outline}
                name="caret-down"
              />
            </View>
          </Button>
        </View>
      }
    >
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          leadingIcon={option.leadingIcon}
          title={option.title}
          style={styles.itemContentStyle}
          containerStyle={styles.itemContainerStyle}
          titleStyle={styles.itemTitleStyle}
          onPress={() => {
            onValueChange(option.value);
            setIsOpen(false);
          }}
        />
      ))}
    </Menu>
  );
};

const getStyles = (theme: CustomTheme, isOpen: boolean) =>
  StyleSheet.create({
    buttonWrapper: { position: "relative", paddingTop: 4 },
    button: {
      overflow: "visible",
      borderColor: isOpen ? theme.colors.primary : theme.colors.outline,
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderRadius: 8,
    },
    label: {
      position: "absolute",
      top: -2,
      left: 10,
      zIndex: 1,
      color: isOpen ? theme.colors.primary : theme.colors.onSurfaceVariant,
      backgroundColor: theme.colors.background,
      fontSize: 12,
      lineHeight: 15,
      paddingHorizontal: 4,
    },
    buttonTextWrapper: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    menuContent: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderRadius: 16,
      borderWidth: 2,
      gap: 4,
    },
    buttonContent: {
      width: "100%",
      gap: 8,
      paddingVertical: 8,
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.outline,
      fontWeight: 600,
      fontSize: 16,
    },
    itemContentStyle: {
      overflow: "hidden",
      gap: 16,
      height: 60,
    },
    itemContainerStyle: {
      gap: 10,
    },
    itemTitleStyle: {
      color: theme.colors.onSurface,
    },
  });

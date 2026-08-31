import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CustomTheme, useAppTheme } from "@theme";
import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

type IconWithBackgroundProps = {
  name: ComponentProps<typeof FontAwesome>["name"];
};

export const IconWithBackground = ({ name }: IconWithBackgroundProps) => {
  const theme = useAppTheme();

  return (
    <View style={styles(theme).container}>
      <FontAwesome name={name} size={24} style={styles(theme).icon} />
    </View>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      aspectRatio: 1,
      width: 60,
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderBottomWidth: 4,
      borderRightWidth: 3,
      backgroundColor: "#DB073D",
      borderColor: "#8F0A2B",
    },
    icon: {
      color: "#FFF",
    },
  });

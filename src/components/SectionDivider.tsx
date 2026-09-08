import { StyleProp, View, ViewStyle } from "react-native";
import { Divider, Text } from "react-native-paper";

type SectionDividerProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const SectionDivider = ({ text, style }: SectionDividerProps) => {
  return (
    <View style={style}>
      <Text>{text}</Text>
      <Divider />
    </View>
  );
};

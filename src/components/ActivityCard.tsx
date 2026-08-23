import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { Text, View } from "./Themed";

export const ActivityCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name="music" size={24} />
        </View>
        <Text>Guitar practice</Text>
      </View>
      <ProgressBar percentage={50} style={{ alignSelf: "stretch" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },
  rowContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconContainer: {
    backgroundColor: "#ccc",
    aspectRatio: 1,
    width: 60,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

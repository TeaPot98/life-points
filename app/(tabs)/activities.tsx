import { StyleSheet } from "react-native";

import { ActivityCard } from "@components/ActivityCard";
import { Text, View } from "@components/Themed";

export default function ActivitiesTabScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activities Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ActivityCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

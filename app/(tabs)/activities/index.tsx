import { StyleSheet } from "react-native";

import { ActivityCard } from "@components/ActivityCard";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useRouter } from "expo-router";

export default function ActivitiesTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ActivityCard />
      <FAB
        actions={[
          {
            icon: "star",
            label: "Activity",
            onPress: () => router.push("/activities/create-activity"),
          },
          {
            icon: "star",
            label: "Goal",
            onPress: () => router.push("/activities/create-goal"),
          },
        ]}
      />
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

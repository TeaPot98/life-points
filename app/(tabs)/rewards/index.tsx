import { StyleSheet } from "react-native";

import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useRouter } from "expo-router";

export default function RewardsTabScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FAB
        actions={[
          {
            icon: "star",
            label: "Activity Reward",
            onPress: () => router.push("/rewards/create-reward-activity"),
          },
          {
            icon: "star",
            label: "Reward",
            onPress: () => router.push("/rewards/create-reward"),
          },
        ]}
      />
    </View>
  );
}

// router.push("/activities/manage-goals")

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

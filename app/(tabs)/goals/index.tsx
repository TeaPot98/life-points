import { StyleSheet } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useUserContext } from "@context";
import { GoalCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function GoalsTabScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const isFocused = useIsFocused();

  const { data: goals } = useQuery({
    queryKey: ["goals"],
    queryFn: () => Api.goals.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {goals?.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "star",
              label: "Activity",
              onPress: () => router.push("/goals/create-activity"),
            },
            {
              icon: "star",
              label: "Goal",
              onPress: () => router.push("/goals/create-goal"),
            },
          ]}
        />
      )}
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

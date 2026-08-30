import { StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { useUserContext } from "@context";
import { GoalCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

export default function ManageGoalsScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();

  const { data: goals } = useQuery({
    queryKey: ["goals"],
    queryFn: () => Api.goals.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals Tab</Text>
      <View style={styles.separator} />
      {goals?.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "star",
              label: "Activity",
              onPress: () => router.push("/goals/activities/create"),
            },
            {
              icon: "star",
              label: "Goal",
              onPress: () => router.push("/goals/create"),
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

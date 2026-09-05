import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { GoalCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function ManageGoalsScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: goals } = useQuery({
    queryKey: queryKeyStore.goals.getAll,
    queryFn: () => Api.goals.getAll(user?.id ?? ""),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 8,
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

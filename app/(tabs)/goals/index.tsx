import { StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { useUserContext } from "@context";
import { UserGoalCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native-paper";

export default function GoalsTabScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const isFocused = useIsFocused();

  const { data: userGoals } = useQuery({
    queryKey: ["user-goals"],
    queryFn: () => Api.userGoals.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals Tab</Text>
      <Button
        onPress={() => {
          router.push("/goals/activities/manage");
        }}
      >
        Manage Activities
      </Button>
      <View style={styles.separator} />
      {userGoals?.map((userGoal) => (
        <UserGoalCard key={userGoal.id} userGoal={userGoal} />
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

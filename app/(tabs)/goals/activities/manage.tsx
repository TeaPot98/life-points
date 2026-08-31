import { StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { ActivityCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

export default function ManageActivitiesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();

  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Activities</Text>
      <View style={styles.separator} />
      {activities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
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

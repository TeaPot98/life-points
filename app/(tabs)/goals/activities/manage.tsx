import { ScrollView, StyleSheet, View } from "react-native";

import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { FAB } from "../../../../src/components/buttons";
import { useUserContext } from "../../../../src/context";
import { ActivityCard } from "../../../../src/features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function ManageActivitiesScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: activities } = useQuery({
    queryKey: queryKeyStore.activities.getAll,
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
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

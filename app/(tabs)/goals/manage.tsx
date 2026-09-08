import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { NoData } from "../../../src/components";
import {
  Button,
  FAB,
  getFabActionProps,
} from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import { GoalCard } from "../../../src/features/goals/components";
import { useAppTheme } from "../../../src/theme";

export default function ManageGoalsScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: goals, isLoading } = useQuery({
    queryKey: queryKeyStore.goals.getAll,
    queryFn: () => Api.goals.getAll(user?.id ?? ""),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {goals?.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
        {!isLoading && !goals?.length && (
          <View style={styles.noDataContainer}>
            <NoData
              action={
                <Button onPress={() => router.push("/goals/create")}>
                  Create Goal
                </Button>
              }
            />
          </View>
        )}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "star",
                label: "Activity",
                onPress: () => router.push("/goals/activities/create"),
                ...getFabActionProps(theme),
              },
              {
                icon: "star",
                label: "Goal",
                onPress: () => router.push("/goals/create"),
                ...getFabActionProps(theme),
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
  noDataContainer: { width: "100%", marginTop: 80, alignItems: "center" },
});

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { NoData, SectionDivider } from "../../../src/components";
import {
  Button,
  FAB,
  getFabActionProps,
} from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import { UserGoalCard } from "../../../src/features/goals/components";
import { useAppTheme } from "../../../src/theme";
import { CustomTheme } from "../../../src/theme/types";
import { computeGoalCompletionPercentage } from "../../../src/utils/goals";

export default function GoalsTabScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const { user } = useUserContext();
  const isFocused = useIsFocused();
  const queryKeyStore = useQueryKeyStore();

  const styles = getStyles(theme);

  const { data: userGoals, isLoading } = useQuery({
    queryKey: queryKeyStore.userGoals.getAll,
    queryFn: () => Api.userGoals.getAll(user?.id ?? ""),
  });

  const inProgressGoals = useMemo(
    () =>
      userGoals?.filter((g) => (computeGoalCompletionPercentage(g) ?? 0) < 100),
    [userGoals],
  );
  const completedGoals = useMemo(
    () =>
      userGoals?.filter(
        (g) => (computeGoalCompletionPercentage(g) ?? 0) === 100,
      ),
    [userGoals],
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button
            color="tertiary"
            icon="cog"
            onPress={() => {
              router.push("/goals/manage");
            }}
          >
            Manage Goals
          </Button>
          <Button
            icon="cog"
            color="tertiary"
            onPress={() => {
              router.push("/goals/activities/manage");
            }}
          >
            Manage Activities
          </Button>
        </View>
        {!isLoading && !userGoals?.length && (
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
        {inProgressGoals?.map((userGoal) => (
          <UserGoalCard key={userGoal.id} userGoal={userGoal} />
        ))}
        {!!completedGoals?.length && <SectionDivider text="Completed" />}
        {completedGoals?.map((userGoal) => (
          <UserGoalCard key={userGoal.id} userGoal={userGoal} />
        ))}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "music",
                label: "Activity",
                onPress: () => router.push("/goals/activities/create"),
                ...getFabActionProps(theme),
              },
              {
                icon: "flag",
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

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 8,
      justifyContent: "center",
    },
    buttonsContainer: {
      flexDirection: "row",
      gap: 8,
    },
    noDataContainer: { width: "100%", marginTop: 80, alignItems: "center" },
  });

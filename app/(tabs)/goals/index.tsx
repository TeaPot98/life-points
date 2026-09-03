import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { Button, FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { UserGoalCard } from "@features/goals/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { useRouter } from "expo-router";
import { Drawer } from "react-native-paper";

export default function GoalsTabScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const { user } = useUserContext();
  const isFocused = useIsFocused();

  const styles = getStyles(theme);

  const { data: userGoals } = useQuery({
    queryKey: ["user-goals"],
    queryFn: () => Api.userGoals.getAll(user?.id ?? ""),
  });

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
        <Drawer.Section>
          <Drawer.Item label="Log out" />
        </Drawer.Section>
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
  });

import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { SectionDivider } from "../../../../src/components";
import {
  Button,
  FAB,
  getFabActionProps,
} from "../../../../src/components/buttons";
import { useUserContext } from "../../../../src/context";
import { ActivityCard } from "../../../../src/features/goals/components";
import { useAppTheme } from "../../../../src/theme";

export default function ManageActivitiesScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const queryKeyStore = useQueryKeyStore();

  const { data: activities, isLoading } = useQuery({
    queryKey: queryKeyStore.activities.getAll,
    queryFn: () => Api.activities.getAll(user?.id ?? ""),
    enabled: !!user,
  });

  const customActivities = activities?.filter((a) => a.user_id) ?? [];
  const defaultActivities = activities?.filter((a) => !a.user_id) ?? [];

  return (
    <ScrollView>
      <View style={styles.container}>
        {!isLoading && <SectionDivider text="Custom Activities" />}
        {
          <Button
            color="secondary"
            onPress={() => router.push("/goals/activities/create")}
          >
            Add Activity
          </Button>
        }
        {customActivities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
        <SectionDivider text="Default Activities" />
        {defaultActivities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
        {isLoading && (
          <ActivityIndicator size={80} style={styles.activityIndicator} />
        )}
        {isFocused && (
          <FAB
            actions={[
              {
                icon: "music",
                label: "Activity",
                onPress: () => router.push("/goals/activities/create"),
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
  activityIndicator: { marginTop: 80 },
});

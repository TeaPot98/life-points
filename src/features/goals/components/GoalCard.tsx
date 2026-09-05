import { Card, IconWithBackground } from "@components";
import { Chip } from "@components/Chip";
import { ACTIVITY_TYPE_ICONS } from "@constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IGoal } from "@local-types/goals";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { Button } from "@components/buttons";
import { useUserContext } from "@context";
import { FontAwesomeName } from "@local-types/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppTheme } from "@theme";
import { CustomTheme, FixedColor } from "@theme/types";
import { capitalize, fromSecondsToHumanReadable, isNil } from "@utils";

type GoalCardProps = {
  goal: IGoal;
};

export const GoalCard = ({
  goal: {
    id,
    type,
    duration,
    goal_count,
    reward,
    reward_per_item,
    schedule,
    name,
    activity,
  },
}: GoalCardProps) => {
  const router = useRouter();
  const theme = useAppTheme();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const styles = getStyles(theme);

  const { mutate: activateGoal } = useMutation({
    mutationFn: (id: number) =>
      Api.userGoals.create({ goal_id: id, user_id: user?.id ?? "" }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getAll,
      }),
  });

  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground
              name={activity.icon as FontAwesomeName}
              color={activity.color as FixedColor}
            />
            <Text variant="titleMedium" style={styles.cardText}>
              {name}
            </Text>
          </View>
          <FontAwesome
            name={ACTIVITY_TYPE_ICONS[type]}
            size={24}
            style={{ position: "absolute", top: 0, right: 0 }}
            color={theme.colors.onSurfaceVariant}
          />
          <View style={styles.chipsContainer}>
            {type === "time" && !isNil(duration) && (
              <Chip icon="hourglass">
                {fromSecondsToHumanReadable(duration)}
              </Chip>
            )}
            {type === "count" && (
              <>
                <Chip>Goal Count: {goal_count}</Chip>
                {!!reward_per_item && (
                  <Chip icon="diamond">{reward_per_item} Per Item</Chip>
                )}
              </>
            )}
            <Chip icon="diamond">{reward}</Chip>
            {schedule !== "none" && (
              <Chip icon="clock-o">{capitalize(schedule)}</Chip>
            )}
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          color="secondary"
          icon="pencil"
          onPress={() =>
            router.push({ pathname: "/(tabs)/goals/[id]/edit", params: { id } })
          }
        >
          Edit
        </Button>
        <Button icon="check" onPress={() => activateGoal(id)}>
          Activate
        </Button>
      </Card.Actions>
    </Card>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 12,
      marginBottom: 8,
    },
    rowContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
    cardText: {
      color: theme.colors.onSurfaceVariant,
    },
  });

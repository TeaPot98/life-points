import { Card, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { Chip } from "@components/Chip";
import { ProgressBar } from "@components/ProgressBar";
import { ACTIVITY_TYPE_ICONS } from "@constants";
import { useGoalsContext } from "@context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IUserGoal } from "@local-types/goals";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { capitalize, fromSecondsToHumanReadable, isNil } from "@utils";
import { computeGoalCompletionPercentage } from "@utils/goals";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type UserGoalCardProps = {
  userGoal: IUserGoal;
  hidePlusButton?: boolean;
};

export const UserGoalCard = ({
  userGoal,
  hidePlusButton = false,
}: UserGoalCardProps) => {
  const router = useRouter();
  const theme = useAppTheme();
  const { setGoalToEdit, setCountGoalModalOpen } = useGoalsContext();
  const percentage = computeGoalCompletionPercentage(userGoal);
  const {
    id,
    goal: {
      type,
      duration,
      goal_count,
      reward,
      reward_per_item,
      schedule,
      name,
      activity,
    },
  } = userGoal;

  const styles = getStyles(theme);

  const onPlusClick = useCallback(() => {
    switch (type) {
      case "milestone":
        router.push({
          pathname: "/(tabs)/goals/user-goals/[id]",
          params: { id },
        });
        break;
      case "count":
        setGoalToEdit(userGoal);
        setCountGoalModalOpen(true);
        break;
      case "time":
        break;
      default:
        break;
    }
  }, [id, router, setCountGoalModalOpen, setGoalToEdit, type, userGoal]);

  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground name={activity.icon} color={activity.color} />
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
          {!isNil(percentage) && (
            <ProgressBar
              value={percentage / 100}
              style={{ alignSelf: "stretch" }}
            />
          )}
        </View>
      </Card.Content>
      <Card.Actions>
        {(type === "count" || type === "milestone") && !hidePlusButton && (
          <Button onPress={onPlusClick} color="secondary">
            <FontAwesome name="plus" />
          </Button>
        )}
        {percentage === 100 ? (
          <Chip icon="check">Completed</Chip>
        ) : (
          <Button>
            <FontAwesome name="check" />
          </Button>
        )}
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

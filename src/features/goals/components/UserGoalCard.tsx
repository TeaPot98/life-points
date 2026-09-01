import { Card, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { Chip } from "@components/Chip";
import { ProgressBar } from "@components/ProgressBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ActivityType } from "@local-types/activities";
import { IUserGoal } from "@local-types/goals";
import { FontAwesomeName } from "@local-types/icons";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { capitalize, fromSecondsToHumanReadable, isNil } from "@utils";
import { computeGoalCompletionPercentage } from "@utils/goals";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type UserGoalCardProps = {
  userGoal: IUserGoal;
};

export const UserGoalCard = ({ userGoal }: UserGoalCardProps) => {
  const router = useRouter();
  const theme = useAppTheme();
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

  return (
    <Card
      onPress={() =>
        router.push({
          pathname: "/(tabs)/goals/user-goals/[id]",
          params: { id },
        })
      }
    >
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground name={activity.icon} />
            <Text variant="titleMedium" style={styles.cardText}>
              {name}
            </Text>
          </View>
          <FontAwesome
            name={TYPE_ICONS[type]}
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
              percentage={percentage}
              style={{ alignSelf: "stretch" }}
            />
          )}
          <Card.Actions>
            <Button color="secondary" icon="pencil">
              Edit
            </Button>
          </Card.Actions>
        </View>
      </Card.Content>
    </Card>
  );
};

const TYPE_ICONS = {
  time: "hourglass-2",
  count: "outdent",
  milestone: "flag",
} satisfies Record<ActivityType, FontAwesomeName>;

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

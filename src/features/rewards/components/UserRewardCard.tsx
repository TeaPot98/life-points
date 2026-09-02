import { Card, Chip, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { IUserReward } from "@local-types/rewards";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { fromSecondsToHumanReadable, isNil } from "@utils";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type UserRewardCardProps = {
  userReward: IUserReward;
};

export const UserRewardCard = ({
  userReward: { reward, claimed_at },
}: UserRewardCardProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const isClaimed = !isNil(claimed_at);

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground name={reward.activity.icon} />
            <Text variant="titleMedium" style={styles.cardText}>
              {reward.activity.name}
            </Text>
          </View>
          <View style={styles.chipsContainer}>
            {!isNil(reward.duration) && (
              <Chip icon="hourglass">
                {fromSecondsToHumanReadable(reward.duration)}
              </Chip>
            )}
            <Chip icon="diamond">{reward.price}</Chip>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          color={isClaimed ? "error" : "secondary"}
          icon="check"
          disabled={isClaimed}
        >
          {isClaimed ? "Claimed" : "Claim"}
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
    rowContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
    iconContainer: {
      backgroundColor: "#ccc",
      aspectRatio: 1,
      width: 60,
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    cardText: {
      color: theme.colors.onSurfaceVariant,
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 12,
      marginBottom: 8,
    },
  });

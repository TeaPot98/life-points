import Api from "../../../api";
import { useQueryKeyStore } from "../../../api-hooks";
import { Card, Chip, IconWithBackground } from "../../../components";
import { Button } from "../../../components/buttons";
import { FontAwesomeName } from "../../../types/icons";
import { IUserReward } from "../../../types/rewards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppTheme } from "../../../theme";
import { CustomTheme, FixedColor } from "../../../theme/types";
import { fromSecondsToHumanReadable, isNil } from "../../../utils";
import dayjs from "dayjs";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type UserRewardCardProps = {
  userReward: IUserReward;
};

export const UserRewardCard = ({ userReward }: UserRewardCardProps) => {
  const { reward, claimed_at } = userReward;
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const isClaimed = !isNil(claimed_at);

  const { mutate: updateUserReward } = useMutation({
    mutationFn: (payload: Partial<IUserReward> & { id: number }) =>
      Api.userRewards.update(payload.id, payload),
    onSuccess: (_, { id }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.userRewards.getById(id),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.userRewards.getAll,
        }),
      ]),
  });

  const onClaimPress = useCallback(
    () =>
      updateUserReward({
        id: userReward.id,
        claimed_at: dayjs().toISOString(),
      }),
    [updateUserReward, userReward.id],
  );

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground
              name={reward.activity.icon as FontAwesomeName}
              color={reward.activity.color as FixedColor}
            />
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
          onPress={onClaimPress}
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

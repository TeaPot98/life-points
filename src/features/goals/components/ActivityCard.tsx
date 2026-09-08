import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Card, IconWithBackground } from "../../../components";
import { IconButton } from "../../../components/buttons";
import { FixedColor } from "../../../theme/types";
import { IActivity, IDefaultActivity } from "../../../types/activities";
import { FontAwesomeName } from "../../../types/icons";

type ActivityCardProps = {
  activity: IActivity | IDefaultActivity;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground
              name={activity.icon as FontAwesomeName}
              color={activity.color as FixedColor}
            />
            <Text variant="titleMedium">{activity.name}</Text>
          </View>
        </View>
        {activity.user_id && (
          <Card.Actions>
            <IconButton
              icon="pencil"
              color="secondary"
              onPress={() =>
                router.push({
                  pathname: "/goals/activities/[id]/edit",
                  params: { id: String(activity.id) },
                })
              }
            >
              <FontAwesome />
            </IconButton>
          </Card.Actions>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: { flexDirection: "row", justifyContent: "space-between" },
  container: {
    // width: "100%",
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
});

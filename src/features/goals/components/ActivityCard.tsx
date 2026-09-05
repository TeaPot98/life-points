import { Card, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { IActivity } from "@local-types/activities";
import { FontAwesomeName } from "@local-types/icons";
import { FixedColor } from "@theme/types";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type ActivityCardProps = {
  activity: IActivity;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <IconWithBackground
              name={activity.icon as FontAwesomeName}
              color={activity.color as FixedColor}
            />
            <Text variant="titleMedium">{activity.name}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            router.push({
              pathname: "/goals/activities/[id]/edit",
              params: { id: String(activity.id) },
            })
          }
        >
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
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
});

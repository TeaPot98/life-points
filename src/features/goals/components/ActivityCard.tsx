import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IActivity } from "@local-types/activities";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type ActivityCardProps = {
  activity: IActivity;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name={activity.icon} size={24} />
        </View>
        <Text>{activity.name}</Text>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
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

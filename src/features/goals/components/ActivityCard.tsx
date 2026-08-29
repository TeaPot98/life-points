import { Text, View } from "@components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IActivity } from "@local-types/activities";
import { StyleSheet } from "react-native";

type ActivityCardProps = {
  activity: IActivity;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name={activity.icon} size={24} />
        </View>
        <Text>{activity.name}</Text>
      </View>
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

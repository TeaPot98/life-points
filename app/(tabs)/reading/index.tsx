import { StyleSheet } from "react-native";

import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function ReadingTabScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "book",
              label: "New Book",
              onPress: () => router.push("/reading/create-book"),
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

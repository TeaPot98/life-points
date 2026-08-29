import { StyleSheet } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { Text, View } from "@components/Themed";
import { useUserContext } from "@context";
import { BookCard, ReadingStatistics } from "@features/reading/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "@utils";
import { useRouter } from "expo-router";

export default function ReadingTabScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const isFocused = useIsFocused();

  const { data: readingStatistics } = useQuery({
    queryKey: ["reading-statistics"],
    queryFn: () => Api.readingTracker.getStatistics(user?.id ?? ""),
  });

  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: () => Api.books.getAll(user?.id ?? ""),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Tab</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {!isNil(readingStatistics) && (
        <ReadingStatistics readingStatistics={readingStatistics} />
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
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

import { StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/FAB";
import { useUserContext } from "@context";
import { BookCard, ReadingStatistics } from "@features/reading/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "@utils";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

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
      <View style={styles.separator} />
      {!isNil(readingStatistics) && (
        <ReadingStatistics readingStatistics={readingStatistics} />
      )}
      <View style={styles.separator} />
      {books?.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "book",
              label: "New Book",
              onPress: () => router.push("/reading/books/create"),
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

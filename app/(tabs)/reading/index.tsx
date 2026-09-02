import { ScrollView, StyleSheet, View } from "react-native";

import Api from "@api";
import { FAB } from "@components/buttons";
import { useUserContext } from "@context";
import { BookCard, ReadingStatistics } from "@features/reading/components";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "@utils";
import { useRouter } from "expo-router";
import { Divider } from "react-native-paper";

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
      {!isNil(readingStatistics) && (
        <ReadingStatistics readingStatistics={readingStatistics} />
      )}
      <Divider style={styles.divider} />
      <ScrollView>
        <View style={styles.booksContainer}>
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>
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
    padding: 16,
    paddingBottom: 0,
  },
  booksContainer: {
    gap: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: { marginVertical: 8 },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

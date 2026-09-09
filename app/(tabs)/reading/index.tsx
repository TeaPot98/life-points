import { ScrollView, StyleSheet, View } from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, Divider } from "react-native-paper";
import Api from "../../../src/api";
import { useQueryKeyStore } from "../../../src/api-hooks";
import { NoData } from "../../../src/components";
import {
  Button,
  FAB,
  getFabActionProps,
} from "../../../src/components/buttons";
import { useUserContext } from "../../../src/context";
import {
  BookCard,
  ReadingStatistics,
} from "../../../src/features/reading/components";
import { useAppTheme } from "../../../src/theme";
import { isNil } from "../../../src/utils";

export default function ReadingTabScreen() {
  const router = useRouter();
  const theme = useAppTheme();
  const { user } = useUserContext();
  const isFocused = useIsFocused();
  const queryKeyStore = useQueryKeyStore();

  const { data: readingStatistics } = useQuery({
    queryKey: queryKeyStore.readingTracker.readingStatistics,
    queryFn: () => Api.readingTracker.getStatistics(user?.id ?? ""),
    enabled: !!user,
  });

  const { data: books, isLoading } = useQuery({
    queryKey: queryKeyStore.books.getAll,
    queryFn: () => Api.books.getAll(user?.id ?? ""),
    enabled: !!user,
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
          {!isLoading && !books?.length && (
            <View style={styles.noDataContainer}>
              <NoData
                action={
                  <Button
                    onPress={() => router.push("/(tabs)/reading/books/create")}
                  >
                    Add Book
                  </Button>
                }
              />
            </View>
          )}
          {isLoading && (
            <ActivityIndicator size={80} style={styles.activityIndicator} />
          )}
        </View>
      </ScrollView>
      {isFocused && (
        <FAB
          actions={[
            {
              icon: "book",
              label: "New Book",
              onPress: () => router.push("/reading/books/create"),
              ...getFabActionProps(theme),
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
  noDataContainer: { width: "100%", marginTop: 80, alignItems: "center" },
  activityIndicator: { marginTop: 80 },
});

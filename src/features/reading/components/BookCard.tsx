import { IBook } from "@local-types/books";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type BookCardProps = {
  book: IBook;
};

export const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text>{book.author}</Text>
        <Text>{book.title}</Text>
        <Text>Total pages: {book.number_of_pages}</Text>
        <Text>Read pages: {book.read_pages}</Text>
      </View>
      <Button
        onPress={() =>
          router.push({
            pathname: "/reading/books/[id]/edit",
            params: { id: String(book.id) },
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
});

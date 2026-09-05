import { useMarkBookAsRead } from "@api-hooks";
import { Card, Chip, IconWithBackground } from "@components";
import { Button } from "@components/buttons";
import { ProgressBar } from "@components/ProgressBar";
import { useBooksContext } from "@context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IBook } from "@local-types/books";
import { useAppTheme } from "@theme";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type BookCardProps = {
  book: IBook;
};

export const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  const theme = useAppTheme();
  const markBookAsRead = useMarkBookAsRead();
  const { setBookModalOpen, setBookToEdit } = useBooksContext();

  const isRead = book.read_pages >= book.number_of_pages;

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <IconWithBackground name="book" color="lightBlue" />
        <View>
          <View style={styles.titleContainer}>
            <Text style={{ fontWeight: "700" }}>{book.title} </Text>
            <Text>by {book.author}</Text>
          </View>
          <View style={styles.progressContainer}>
            <ProgressBar value={book.read_pages / book.number_of_pages} />
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              {book.read_pages}/{book.number_of_pages}
            </Text>
          </View>
        </View>
      </Card.Content>
      <View style={styles.actionsContainer}>
        <Button
          icon="pencil"
          color="secondary"
          onPress={() =>
            router.push({
              pathname: "/reading/books/[id]/edit",
              params: { id: String(book.id) },
            })
          }
        >
          Edit
        </Button>
        {isRead && <Chip icon="check">Read</Chip>}
        {!isRead && (
          <>
            <Button
              onPress={() => {
                setBookToEdit(book);
                setBookModalOpen(true);
              }}
              color="secondary"
            >
              <FontAwesome name="plus" />
            </Button>
            <Button onPress={() => markBookAsRead(book)}>
              <FontAwesome name="check" />
            </Button>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "stretch",
    gap: 8,
  },
  cardContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "flex-end",
    gap: 6,
    alignItems: "center",
  },
});

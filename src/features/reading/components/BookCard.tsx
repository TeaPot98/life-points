import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useMarkBookAsRead } from "../../../api-hooks";
import { Card, Chip, IconWithBackground } from "../../../components";
import { Button } from "../../../components/buttons";
import { ProgressBar } from "../../../components/ProgressBar";
import { useBooksContext, useUserContext } from "../../../context";
import { useAppTheme } from "../../../theme";
import { IBook } from "../../../types/books";
import { getBookCover } from "../../../utils";

type BookCardProps = {
  book: IBook;
};

export const BookCard = ({ book }: BookCardProps) => {
  const router = useRouter();
  const theme = useAppTheme();
  const { user } = useUserContext();
  const markBookAsRead = useMarkBookAsRead();
  const { setBookModalOpen, setBookToEdit } = useBooksContext();

  const isRead = book.read_pages >= book.number_of_pages;

  const { data: imgUrl } = useQuery({
    queryKey: ["book-images", book.image_path, user?.id],
    queryFn: () => getBookCover(book.image_path!),
    enabled: !!book.image_path,
  });

  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        {imgUrl ? (
          <Image
            source={{ uri: imgUrl }}
            style={{ width: 80, height: 80, borderRadius: 12 }}
          />
        ) : (
          <IconWithBackground name="book" color="red" />
        )}
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

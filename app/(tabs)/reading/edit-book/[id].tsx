import Api from "@api";
import { useUserContext } from "@context";
import { BookForm, BookFormValues } from "@features/reading";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditBookScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";

  const { data: book, isFetching: isBookFetching } = useQuery({
    queryKey: ["book", id],
    queryFn: () => Api.books.getById(Number(id), userId),
  });

  const onSubmit = async (values: BookFormValues) => {
    try {
      if (!book) {
        console.error("The book was not yet fetched");
        return;
      }

      await Api.books.update(book.id, { ...values, user_id: userId });

      router.back();
    } catch (error) {
      console.error("An error occured while adding a book", error);
    }
  };

  if (!book) return;

  return (
    <BookForm
      onSubmit={onSubmit}
      defaultValues={{
        author: book.author,
        number_of_pages: book.number_of_pages,
        read_pages: book.read_pages,
        title: book.title,
      }}
    />
  );
}

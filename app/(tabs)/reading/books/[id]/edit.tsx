import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { useUserContext } from "@context";
import { BookForm, BookFormValues } from "@features/reading";
import { IBook } from "@local-types/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditBookScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: (payload: Partial<IBook> & { id: number }) =>
      Api.books.update(payload.id, payload),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.books.getById(Number(id)),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.books.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.readingTracker.readingStatistics,
        }),
      ]),
  });

  const { data: book, isFetching: isBookFetching } = useQuery({
    queryKey: queryKeyStore.books.getById(Number(id)),
    queryFn: () => Api.books.getById(Number(id), userId),
  });

  const onSubmit = async (values: BookFormValues) => {
    try {
      if (!book) {
        console.error("The book was not yet fetched");
        return;
      }

      await updateBook({ ...values, id: book.id, user_id: userId });

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

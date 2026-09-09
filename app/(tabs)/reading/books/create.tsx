import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../src/context";
import { BookForm, BookFormValues } from "../../../../src/features/reading";

export default function CreateBookScreen() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const userId = user?.id ?? "";

  const { mutateAsync: fetchReadingTracker } = useMutation({
    mutationFn: () => Api.readingTracker.getByUserId(user?.id ?? ""),
  });

  const { mutateAsync: createBook } = useMutation({
    mutationFn: Api.books.create,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.books.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.readingTracker.readingStatistics,
        }),
      ]),
  });

  const { mutateAsync: createReadingTracker } = useMutation({
    mutationFn: Api.readingTracker.create,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.readingTracker.tracker,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.readingTracker.readingStatistics,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.books.getAll,
        }),
      ]),
  });

  const onSubmit = async ({
    number_of_pages,
    read_pages,
    ...values
  }: BookFormValues) => {
    try {
      const readingTracker = await fetchReadingTracker();

      if (!readingTracker) {
        await createReadingTracker({ user_id: userId });
      }

      await createBook({
        number_of_pages: Number(number_of_pages),
        read_pages: Number(read_pages),
        ...values,
        user_id: userId,
      });

      triggerNotification({ message: "Book successfully created!" });
    } catch (error) {
      console.error("An error occured while adding a book", error);
      triggerNotification({ type: "error" });
    }
  };

  return <BookForm onSubmit={onSubmit} />;
}

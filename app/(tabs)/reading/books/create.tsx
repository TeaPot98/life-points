import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { useUserContext } from "@context";
import { BookForm, BookFormValues } from "@features/reading";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateBookScreen() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const userId = user?.id ?? "";

  const { mutateAsync: fetchReadingTracker } = useMutation({
    mutationFn: () => Api.readingTracker.getByUserId(user?.id ?? ""),
  });

  const { mutateAsync: createReadingTracker } = useMutation({
    mutationFn: Api.readingTracker.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.readingTracker.tracker,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.readingTracker.readingStatistics,
      });
    },
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

      Api.books.create({
        number_of_pages: Number(number_of_pages),
        read_pages: Number(read_pages),
        ...values,
        user_id: userId,
      });
    } catch (error) {
      console.error("An error occured while adding a book", error);
    }
  };

  return <BookForm onSubmit={onSubmit} />;
}

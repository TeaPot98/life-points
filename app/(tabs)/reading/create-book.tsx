import Api from "@api";
import { useUserContext } from "@context";
import { BookForm, BookFormValues } from "@features/reading";
import { useMutation } from "@tanstack/react-query";

export default function CreateBookScreen() {
  const { user } = useUserContext();

  const userId = user?.id ?? "";

  const { mutateAsync: fetchReadingTracker } = useMutation({
    mutationKey: ["fetch", "readingTracker", userId],
    mutationFn: () => Api.readingTracker.getByUserId(user?.id ?? ""),
  });

  const { mutateAsync: createReadingTracker } = useMutation({
    mutationKey: ["create", "redingTracker", userId],
    mutationFn: Api.readingTracker.create,
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

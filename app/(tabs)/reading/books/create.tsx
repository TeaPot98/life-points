import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../src/context";
import { BookForm, BookFormValues } from "../../../../src/features/reading";
import { uploadBookCover } from "../../../../src/utils";

export default function CreateBookScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    image_uri,
    ...values
  }: BookFormValues) => {
    try {
      setIsSubmitting(true);

      const readingTracker = await fetchReadingTracker();
      let imagePath: string | null = null;

      if (!readingTracker) {
        await createReadingTracker({ user_id: userId });
      }

      if (image_uri) {
        imagePath = await uploadBookCover(image_uri, userId);
      }

      await createBook({
        number_of_pages: Number(number_of_pages),
        read_pages: Number(read_pages ?? "0"),
        ...values,
        user_id: userId,
        image_path: imagePath,
      });

      triggerNotification({ message: "Book successfully created!" });
      router.back();
    } catch (error) {
      console.error("An error occured while adding a book", error);
      triggerNotification({ type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <BookForm onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}

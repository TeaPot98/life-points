import Api from "@api";
import { useBooksContext } from "@context";
import { IBook } from "@local-types/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useQueryKeyStore } from "./userQueryKeys";

export function useMarkBookAsRead() {
  const { readingTracker } = useBooksContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: (book: Partial<IBook> & { id: number }) =>
      Api.books.update(book.id, book),
    onSuccess: async (_, book) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.goals.getById(book.id),
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.goals.getAll,
      });
    },
  });

  const { mutateAsync: updateUserPoints } = useMutation({
    mutationFn: Api.userData.updatePoints,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.userData.get,
      }),
  });

  return useCallback(
    async (book: IBook) => {
      if (!readingTracker) return;

      await updateBook({
        id: book.id,
        read_pages: book.number_of_pages,
      });
      await updateUserPoints(
        readingTracker?.reward_per_page +
          (book.number_of_pages - book.read_pages) *
            readingTracker?.reward_per_page,
      );
    },
    [readingTracker, updateBook, updateUserPoints],
  );
}

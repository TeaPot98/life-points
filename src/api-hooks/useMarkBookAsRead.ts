import Api from "@api";
import { useBooksContext } from "@context";
import { IBook } from "@local-types/books";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export function useMarkBookAsRead() {
  const { readingTracker } = useBooksContext();

  const { mutateAsync: updateBook } = useMutation({
    mutationFn: (book: Partial<IBook> & { id: number }) =>
      Api.books.update(book.id, book),
  });

  const { mutateAsync: updateUserPoints } = useMutation({
    mutationFn: Api.userData.updatePoints,
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

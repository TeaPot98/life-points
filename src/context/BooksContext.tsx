import Api from "../api";
import { useQueryKeyStore } from "../api-hooks";
import { IBook, IReadingTracker } from "../types/books";
import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useUserContext } from "./UserContext";

type BooksContextValue = {
  bookToEdit: IBook | null;
  setBookToEdit: (goal: IBook | null) => void;
  isBookModalOpen: boolean;
  setBookModalOpen: (open: boolean) => void;
  isReadingTrackerModalOpen: boolean;
  setReadingTrackerModalOpen: (open: boolean) => void;
  readingTracker?: IReadingTracker;
};

export const BooksContext = createContext<BooksContextValue>({
  bookToEdit: null,
  setBookToEdit: () => {},
  isBookModalOpen: false,
  setBookModalOpen: () => {},
  isReadingTrackerModalOpen: false,
  setReadingTrackerModalOpen: () => {},
});

export const useBooksContext = () => useContext(BooksContext);

export const BooksContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useUserContext();
  const [bookToEdit, setBookToEdit] = useState<IBook | null>(null);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [isReadingTrackerModalOpen, setReadingTrackerModalOpen] =
    useState(false);
  const queryKeyStore = useQueryKeyStore();

  const { data: readingTracker } = useQuery({
    queryKey: queryKeyStore.readingTracker.tracker,
    queryFn: () => Api.readingTracker.getByUserId(user?.id ?? ""),
  });

  return (
    <BooksContext
      value={{
        bookToEdit,
        setBookToEdit,
        isBookModalOpen,
        setBookModalOpen,
        isReadingTrackerModalOpen,
        setReadingTrackerModalOpen,
        readingTracker,
      }}
    >
      {children}
    </BooksContext>
  );
};

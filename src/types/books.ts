import { Database } from "./database";

export type BooksUpdatePayload =
  Database["public"]["Tables"]["books"]["Update"];

export type BooksCreatePayload =
  Database["public"]["Tables"]["books"]["Insert"];

export type ReadingTrackerUpdatePayload =
  Database["public"]["Tables"]["reading_trackers"]["Update"];

export type ReadingTrackerCreatePayload =
  Database["public"]["Tables"]["reading_trackers"]["Insert"];

export type IBook = Database["public"]["Tables"]["books"]["Row"];

export type IReadingStatistics =
  Database["public"]["Tables"]["reading_trackers"]["Row"] & {
    last_book: IBook | null;
    total_books: number;
  };

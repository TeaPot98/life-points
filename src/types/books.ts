import { Database } from "./database";

export type BooksUpdatePayload =
  Database["public"]["Tables"]["books"]["Update"];

export type BooksCreatePayload =
  Database["public"]["Tables"]["books"]["Insert"];

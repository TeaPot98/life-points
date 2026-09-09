import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { supabase } from "../api";

export async function uploadBookCover(uri: string, userId: string) {
  const fileHandler = new FileSystem.File(uri);
  const base64 = await fileHandler.base64();

  const extension = uri.split(".").pop()?.toLowerCase() ?? "jpg";

  const fileName = `${Math.random().toString().slice(2)}.${extension}`;

  const path = `${userId}/${fileName}`;

  const contentType =
    extension === "png"
      ? "image/png"
      : extension === "webp"
        ? "image/webp"
        : "image/jpeg";

  const { data, error } = await supabase.storage
    .from("book-images")
    .upload(path, decode(base64), {
      contentType,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  return data.path;
}

export async function getBookCover(imagePath: string) {
  return (
    await supabase.storage.from("book-images").createSignedUrl(imagePath, 3600)
  ).data?.signedUrl;
}

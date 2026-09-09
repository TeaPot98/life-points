import { Button } from "../../../components/buttons";
import {
  ControlledNumberInput,
  ControlledTextInput,
} from "../../../components/inputs";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";

import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useUserContext } from "../../../context";
import { getBookCover } from "../../../utils";

export type BookFormValues = {
  title: string;
  author: string;
  number_of_pages: number;
  read_pages: number;
  image_uri?: string | null;
  image_storage_path?: string | null;
};

type BookFormProps = {
  onSubmit: (values: BookFormValues) => void;
  defaultValues?: BookFormValues;
  isSubmitting: boolean;
};

export const BookForm = ({
  onSubmit,
  defaultValues,
  isSubmitting,
}: BookFormProps) => {
  const { user } = useUserContext();
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<BookFormValues>({
      defaultValues,
    });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setValue("image_uri", result.assets[0].uri, {
        shouldDirty: true,
      });
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setValue("image_uri", result.assets[0].uri, {
        shouldDirty: true,
      });
    }
  };

  const { data: storageImgUrl } = useQuery({
    queryKey: ["book-images", defaultValues?.image_storage_path, user?.id],
    queryFn: () => getBookCover(defaultValues?.image_storage_path!),
    enabled: !!defaultValues?.image_storage_path,
  });

  const imageUri = watch("image_uri");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <View style={styles.container}>
      {storageImgUrl && (
        <Image source={{ uri: storageImgUrl }} style={styles.image} />
      )}
      <ControlledTextInput
        control={control}
        name="title"
        textInputPros={{ label: "Title" }}
        controllerProps={{
          rules: {
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledTextInput
        control={control}
        name="author"
        textInputPros={{ label: "Author" }}
        controllerProps={{
          rules: {
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledNumberInput
        control={control}
        name="number_of_pages"
        inputProps={{ label: "Number of Pages" }}
        controllerProps={{
          rules: {
            min: {
              value: 1,
              message: "The value should be bigger than 0",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledNumberInput
        control={control}
        name="read_pages"
        inputProps={{ label: "Read Pages (optional)" }}
        controllerProps={{
          rules: {
            min: {
              value: 0,
              message: "The value should be bigger than 0",
            },
          },
        }}
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {!defaultValues && (
        <View style={styles.imageActions}>
          <Button icon="image" onPress={pickImage}>
            Choose photo
          </Button>

          <Button icon="camera" onPress={takePhoto}>
            Take photo
          </Button>
        </View>
      )}
      <Button
        icon="plus"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  image: { width: 200, height: 200, alignSelf: "center", borderRadius: 18 },
  imageActions: {
    flexDirection: "row",
    gap: 8,
  },
});

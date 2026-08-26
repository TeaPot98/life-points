import Api from "@api";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type FormFieldValues = {
  title: string;
  author: string;
  number_of_pages: number;
  read_pages: number;
};

export default function CreateBookScreen() {
  const { user } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldValues>();

  const userId = user?.id ?? "";

  const { mutateAsync: fetchReadingTracker } = useMutation({
    mutationKey: ["fetch", "readingTracker", user?.id],
    mutationFn: () => Api.readingTracker.getByUserId(user?.id ?? ""),
  });

  const { mutateAsync: createReadingTracker } = useMutation({
    mutationKey: ["create", "redingTracker", user?.id],
    mutationFn: Api.readingTracker.create,
  });

  const onSubmit = async (values: FormFieldValues) => {
    try {
      const readingTracker = await fetchReadingTracker();

      if (!readingTracker) {
        await createReadingTracker({ user_id: userId });
      }

      Api.books.create({ ...values, user_id: userId });
    } catch (error) {
      console.error("An error occured while adding a book", error);
    }
  };

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="title"
        textInputPros={{ label: "Title" }}
      />
      <ControlledTextInput
        control={control}
        name="author"
        textInputPros={{ label: "Author" }}
      />
      <ControlledTextInput
        control={control}
        name="number_of_pages"
        textInputPros={{ label: "Number of Pages" }}
      />
      <ControlledTextInput
        control={control}
        name="read_pages"
        textInputPros={{ label: "Read Pages (optional)" }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

import Api from "@api";
import { useMarkBookAsRead } from "@api-hooks";
import { Button } from "@components/buttons";
import { ControlledNumberInput } from "@components/inputs";
import { useBooksContext } from "@context";
import { IBook } from "@local-types/books";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Divider, Modal, Portal, Surface, Text } from "react-native-paper";

type FormFieldsType = {
  incrementWith: number;
};

export const BookModal = () => {
  const {
    bookToEdit,
    isBookModalOpen: isOpen,
    setBookModalOpen: setIsOpen,
  } = useBooksContext();
  const markBookAsRead = useMarkBookAsRead();
  const { control, handleSubmit } = useForm<FormFieldsType>({
    validate: async ({ formValues }) => {
      if (formValues.incrementWith <= 0)
        return {
          incrementWith: {
            type: "formError",
            message: "The value should be greater than 0",
          },
        };

      return true;
    },
  });

  const { mutateAsync: incrementGoal } = useMutation({
    mutationFn: async ({
      goalIncrement,
      book,
    }: {
      book: IBook;
      goalIncrement: number;
    }) => {
      const resultingPages = book.read_pages + goalIncrement;

      if (resultingPages >= book.number_of_pages) {
        await markBookAsRead(book);
      } else {
        await Api.books.update(book.id, {
          read_pages: book.read_pages + goalIncrement,
        });
      }
    },
  });

  const onSubmit = async ({ incrementWith }: FormFieldsType) => {
    if (!bookToEdit) return;

    await incrementGoal({ goalIncrement: incrementWith, book: bookToEdit });
    setIsOpen(false);
  };

  return (
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={() => setIsOpen(false)}
        contentContainerStyle={{
          margin: 24,
        }}
      >
        <Surface
          style={{
            padding: 20,
            borderRadius: 16,
            gap: 12,
          }}
        >
          <Text variant="titleMedium">How many pages did you read?</Text>
          <Divider />
          <ControlledNumberInput
            control={control}
            name="incrementWith"
            inputProps={{ label: "New pages read" }}
          />
          <Button onPress={handleSubmit(onSubmit)}>Save</Button>

          <Button
            icon="close"
            color="secondary"
            onPress={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

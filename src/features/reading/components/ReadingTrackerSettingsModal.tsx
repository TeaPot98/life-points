import Api from "../../../api";
import { useQueryKeyStore } from "../../../api-hooks";
import { Button } from "../../../components/buttons";
import { ControlledNumberInput } from "../../../components/inputs";
import { useBooksContext } from "../../../context";
import { IReadingTracker } from "../../../types/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Divider, Modal, Portal, Surface, Text } from "react-native-paper";

type FormFieldsType = {
  rewardPerPage: number;
};

export const ReadingTrackerSettingsModal = () => {
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const {
    readingTracker,
    isReadingTrackerModalOpen: isOpen,
    setReadingTrackerModalOpen: setIsOpen,
  } = useBooksContext();
  const { control, handleSubmit, reset } = useForm<FormFieldsType>({
    validate: async ({ formValues }) => {
      if (formValues.rewardPerPage < 0)
        return {
          rewardPerPage: {
            type: "formError",
            message: "The value can not be negative",
          },
        };

      return true;
    },
  });

  useEffect(() => {
    if (!readingTracker) return;

    reset({ rewardPerPage: readingTracker?.reward_per_page });
  }, [readingTracker, readingTracker?.reward_per_page, reset]);

  const { mutateAsync: updateReatingTracker } = useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<IReadingTracker> & { id: number }) =>
      Api.readingTracker.update(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.readingTracker.tracker,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.readingTracker.readingStatistics,
      });
    },
  });

  const onSubmit = async ({ rewardPerPage }: FormFieldsType) => {
    if (!readingTracker) return;

    await updateReatingTracker({
      id: readingTracker.id,
      reward_per_page: rewardPerPage,
    });
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
          <Text variant="titleMedium">Configure reading tracker</Text>
          <Divider />
          <ControlledNumberInput
            control={control}
            name="rewardPerPage"
            inputProps={{ label: "Reward per page" }}
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

import Api from "@api";
import { useMarkUserGoalAsCompleted, useQueryKeyStore } from "@api-hooks";
import { Button } from "@components/buttons";
import { ControlledNumberInput } from "@components/inputs";
import { useGoalsContext } from "@context";
import { IUserGoal } from "@local-types/goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Divider, Modal, Portal, Surface, Text } from "react-native-paper";

type FormFieldsType = {
  incrementWith: number;
};

export const CountGoalModal = () => {
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const markGoalAsCompleted = useMarkUserGoalAsCompleted();

  const {
    goalToEdit,
    isCountGoalModalOpen: isOpen,
    setCountGoalModalOpen: setIsOpen,
  } = useGoalsContext();

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
      prevGoal,
    }: {
      prevGoal: IUserGoal;
      goalIncrement: number;
    }) => {
      const resultingPoints = prevGoal.completed_count + goalIncrement;

      if (resultingPoints >= prevGoal.goal.goal_count) {
        await markGoalAsCompleted(prevGoal);
      } else {
        await Api.userGoals.update(prevGoal.id, {
          completed_count: resultingPoints,
        });
        const gainedPoints = resultingPoints - prevGoal.completed_count;
        await Api.userData.updatePoints(gainedPoints);
      }
    },
    onSuccess: async (_, { prevGoal }) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getById(prevGoal.id),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeyStore.userGoals.getAll,
      });
    },
  });

  const onSubmit = async ({ incrementWith }: FormFieldsType) => {
    if (!goalToEdit) return;

    await incrementGoal({ goalIncrement: incrementWith, prevGoal: goalToEdit });
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
          <Text variant="titleMedium">Increment count goal</Text>
          <Divider />
          <ControlledNumberInput
            control={control}
            name="incrementWith"
            inputProps={{ label: "Increment with" }}
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../src/context";
import {
  ActivityForm,
  ActivityFormValues,
} from "../../../../src/features/goals";

export default function CreateActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const { mutate: createActivitiy, isPending } = useMutation({
    mutationFn: Api.activities.create,
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.activities.getAll,
      });
      triggerNotification({ message: "Goal activity successfully created!" });
    },
  });

  const onSubmit = (values: ActivityFormValues) => {
    createActivitiy({ ...values, user_id: user?.id ?? "" });
  };

  return (
    <ScrollView>
      <ActivityForm onSubmit={onSubmit} isSubmitting={isPending} />
    </ScrollView>
  );
}

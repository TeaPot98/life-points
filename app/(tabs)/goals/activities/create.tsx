import Api from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { useUserContext } from "@context";
import { ActivityForm, ActivityFormValues } from "@features/goals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollView } from "react-native";

export default function CreateActivityScreen() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutate: createActivitiy } = useMutation({
    mutationFn: Api.activities.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.activities.getAll,
      }),
  });

  const onSubmit = (values: ActivityFormValues) => {
    createActivitiy({ ...values, user_id: user?.id ?? "" });
  };

  return (
    <ScrollView>
      <ActivityForm onSubmit={onSubmit} />
    </ScrollView>
  );
}

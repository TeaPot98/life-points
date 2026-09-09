import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import Api from "../../../../../src/api";
import { useQueryKeyStore } from "../../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../../src/context";
import {
  ActivityForm,
  ActivityFormValues,
} from "../../../../../src/features/goals";
import { IActivity } from "../../../../../src/types/activities";

export default function EditActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const { data: activity, isFetching: isActivityFetching } = useQuery({
    queryKey: queryKeyStore.activities.getById(Number(id)),
    queryFn: () => Api.activities.getById(Number(id), userId),
    enabled: !!user,
  });

  const { mutateAsync: updateActivity, isPending: isActivityUpdating } =
    useMutation({
      mutationFn: (payload: Partial<IActivity> & { id: number }) =>
        Api.activities.update(payload.id, payload),
      onSuccess: (_, { id }) =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.activities.getAll,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.activities.getById(id),
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.goals.getAll,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeyStore.userGoals.getAll,
          }),
        ]),
    });

  const onSubmit = async (values: ActivityFormValues) => {
    try {
      if (!activity) {
        console.error("The activity was not yet fetched");
        return;
      }

      await updateActivity({ id: activity.id, ...values, user_id: userId });

      triggerNotification({ message: "Goal activity successfully saved!" });

      router.back();
    } catch (error) {
      console.error("An error occured while adding a activity", error);
      triggerNotification({ type: "error" });
    }
  };

  if (!activity) return;

  return (
    <ActivityForm
      onSubmit={onSubmit}
      defaultValues={{
        name: activity.name,
        icon: activity.icon,
        color: activity.color,
      }}
      isSubmitting={isActivityUpdating || isActivityFetching}
    />
  );
}

import Api from "@api";
import { useUserContext } from "@context";
import { ActivityForm, ActivityFormValues } from "@features/goals";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";

  const { data: activity, isFetching: isActivityFetching } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => Api.activities.getById(Number(id), userId),
  });

  const onSubmit = async (values: ActivityFormValues) => {
    try {
      if (!activity) {
        console.error("The activity was not yet fetched");
        return;
      }

      await Api.activities.update(activity.id, {
        ...values,
        user_id: userId,
      });

      router.back();
    } catch (error) {
      console.error("An error occured while adding a activity", error);
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
    />
  );
}

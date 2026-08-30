import Api from "@api";
import { useUserContext } from "@context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "@features/rewards";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditRewardActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";

  const { data: rewardActivity, isFetching: isRewardActivityFetching } =
    useQuery({
      queryKey: ["activity-reward", id],
      queryFn: () => Api.rewardActivities.getById(Number(id), userId),
    });

  const onSubmit = async (values: RewardActivityFormValues) => {
    try {
      if (!rewardActivity) {
        console.error("The rewardActivity was not yet fetched");
        return;
      }

      await Api.rewardActivities.update(rewardActivity.id, {
        ...values,
        user_id: userId,
      });

      router.back();
    } catch (error) {
      console.error("An error occured while adding a rewardActivity", error);
    }
  };

  if (!rewardActivity) return;

  return (
    <RewardActivityForm
      onSubmit={onSubmit}
      defaultValues={{
        icon: rewardActivity.icon,
        color: rewardActivity.color,
        name: rewardActivity.name,
      }}
    />
  );
}

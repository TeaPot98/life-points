import Api from "../../../../../src/api";
import { useQueryKeyStore } from "../../../../../src/api-hooks";
import { useUserContext } from "../../../../../src/context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "../../../../../src/features/rewards";
import { IRewardActivity } from "../../../../../src/types/rewards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditRewardActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const userId = user?.id ?? "";
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { data: rewardActivity, isFetching: isRewardActivityFetching } =
    useQuery({
      queryKey: queryKeyStore.rewardActivities.getById(Number(id)),
      queryFn: () => Api.rewardActivities.getById(Number(id), userId),
    });

  const { mutateAsync: udpateRewardActivity } = useMutation({
    mutationFn: (payload: Partial<IRewardActivity> & { id: number }) =>
      Api.rewardActivities.update(payload.id, payload),
    onSuccess: (_, { id }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.rewardActivities.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.rewardActivities.getById(id),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.userRewards.getAll,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeyStore.rewards.getAll,
        }),
      ]),
  });

  const onSubmit = async (values: RewardActivityFormValues) => {
    try {
      if (!rewardActivity) {
        console.error("The rewardActivity was not yet fetched");
        return;
      }

      await udpateRewardActivity({
        id: rewardActivity.id,
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

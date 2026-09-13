import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../src/context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "../../../../src/features/rewards";

export default function CreateRewardActivityScreen() {
  const router = useRouter();
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const {
    mutateAsync: createRewardActivity,
    isPending: isCreateRewardActivityPending,
  } = useMutation({
    mutationFn: Api.rewardActivities.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.rewardActivities.getAll,
      });
    },
  });

  const onSubmit = (values: RewardActivityFormValues) => {
    try {
      createRewardActivity({ ...values, user_id: user?.id ?? "" });
      triggerNotification({ message: "Reward activity successfully created!" });
      router.replace("/(tabs)/rewards/reward-activities/manage");
    } catch (err) {
      console.error(err);
      triggerNotification({ type: "error" });
    }
  };

  return (
    <RewardActivityForm
      onSubmit={onSubmit}
      isSubmitting={isCreateRewardActivityPending}
    />
  );
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useNotifications, useUserContext } from "../../../../src/context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "../../../../src/features/rewards";

export default function CreateRewardActivityScreen() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();
  const { triggerNotification } = useNotifications();

  const {
    mutate: createRewardActivity,
    isPending: isCreateRewardActivityPending,
  } = useMutation({
    mutationFn: Api.rewardActivities.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.rewardActivities.getAll,
      });
      triggerNotification({ message: "Reward activity successfully created!" });
    },
  });

  const onSubmit = (values: RewardActivityFormValues) => {
    createRewardActivity({ ...values, user_id: user?.id ?? "" });
  };

  return (
    <RewardActivityForm
      onSubmit={onSubmit}
      isSubmitting={isCreateRewardActivityPending}
    />
  );
}

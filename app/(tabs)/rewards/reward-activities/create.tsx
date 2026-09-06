import Api from "../../../../src/api";
import { useQueryKeyStore } from "../../../../src/api-hooks";
import { useUserContext } from "../../../../src/context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "../../../../src/features/rewards";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateRewardActivityScreen() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const queryKeyStore = useQueryKeyStore();

  const { mutate: createRewardActivity } = useMutation({
    mutationFn: Api.rewardActivities.create,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeyStore.rewardActivities.getAll,
      }),
  });

  const onSubmit = (values: RewardActivityFormValues) => {
    createRewardActivity({ ...values, user_id: user?.id ?? "" });
  };

  return <RewardActivityForm onSubmit={onSubmit} />;
}

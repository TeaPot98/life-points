import Api from "@api";
import { useUserContext } from "@context";
import {
  RewardActivityForm,
  RewardActivityFormValues,
} from "@features/rewards";

export default function CreateRewardActivityScreen() {
  const { user } = useUserContext();

  const onSubmit = (values: RewardActivityFormValues) => {
    Api.rewardActivities.create({ ...values, user_id: user?.id ?? "" });
  };

  return <RewardActivityForm onSubmit={onSubmit} />;
}

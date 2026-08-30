import Api from "@api";
import { useUserContext } from "@context";
import { ActivityForm, ActivityFormValues } from "@features/goals";

export default function CreateActivityScreen() {
  const { user } = useUserContext();

  const onSubmit = (values: ActivityFormValues) => {
    Api.activities.create({ ...values, user_id: user?.id ?? "" });
  };

  return <ActivityForm onSubmit={onSubmit} />;
}

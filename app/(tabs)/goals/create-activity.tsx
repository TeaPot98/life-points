import Api from "@api";
import { ControlledTextInput } from "@components/ControlledTextInput";
import { View } from "@components/Themed";
import { useUserContext } from "@context";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type FormFieldValues = {
  name: string;
  icon: string;
  color: string;
};

export default function CreateActivityScreen() {
  const { user } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldValues>();

  const onSubmit = (values: FormFieldValues) => {
    Api.activities.create({ ...values, user_id: user?.id ?? "" });
  };

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="name"
        textInputPros={{ label: "name" }}
      />
      <ControlledTextInput
        control={control}
        name="icon"
        textInputPros={{ label: "icon" }}
      />
      <ControlledTextInput
        control={control}
        name="color"
        textInputPros={{ label: "color" }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});

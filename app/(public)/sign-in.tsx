import { StyleSheet, View } from "react-native";

import { ControlledTextInput } from "@components/inputs";
import { useUserContext } from "@context";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";

type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const { signInWithPassword } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldsType>();

  const onSubmit = (values: FormFieldsType) => {
    console.log({ values });
    signInWithPassword(values);
  };

  const onInvalid = (arg: any) => {
    console.log({ arg });
  };

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="email"
        textInputPros={{ label: "Email" }}
      />
      <ControlledTextInput
        control={control}
        name="password"
        textInputPros={{ label: "Password" }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit, onInvalid)}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  textInput: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

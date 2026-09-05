import { StyleSheet, View } from "react-native";

import { Button } from "@components/buttons";
import { ControlledTextInput } from "@components/inputs";
import { useUserContext } from "@context";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text } from "react-native-paper";

type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const router = useRouter();
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
        textInputPros={{ label: "Password", secureTextEntry: true }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit, onInvalid)}>
        Log In
      </Button>
      <Text>OR</Text>
      <Button onPress={() => router.replace("/(public)/sign-up")}>
        Create New Account
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

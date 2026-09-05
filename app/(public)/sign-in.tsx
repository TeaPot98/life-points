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
    signInWithPassword(values);
  };

  return (
    <View style={styles.container}>
      <ControlledTextInput
        control={control}
        name="email"
        textInputPros={{ label: "Email" }}
        controllerProps={{
          rules: {
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <ControlledTextInput
        control={control}
        name="password"
        textInputPros={{ label: "Password", secureTextEntry: true }}
        controllerProps={{
          rules: {
            minLength: {
              value: 6,
              message: "Password should have 6 minimum characters",
            },
            required: {
              value: true,
              message: "This field is required",
            },
          },
        }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit)}>
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

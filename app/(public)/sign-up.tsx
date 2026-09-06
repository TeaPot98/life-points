import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { DividerWithText } from "../../src/components";
import { Button } from "../../src/components/buttons";
import { ControlledTextInput } from "../../src/components/inputs";
import { useUserContext } from "../../src/context";

type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const { signUpWithPassword } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldsType>();

  const onSubmit = (values: FormFieldsType) => {
    signUpWithPassword(values);
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
      <Button onPress={handleSubmit(onSubmit)}>Sign Up</Button>
      <DividerWithText text="OR" />
      <Button
        color="secondary"
        onPress={() => router.replace("/(public)/sign-in")}
      >
        Use an existing account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  textInput: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

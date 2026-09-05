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
      />
      <ControlledTextInput
        control={control}
        name="password"
        textInputPros={{ label: "Password", secureTextEntry: true }}
      />
      <Button icon="plus" onPress={handleSubmit(onSubmit)}>
        Sign Up
      </Button>
      <Text>OR</Text>
      <Button icon="plus" onPress={() => router.replace("/(public)/sign-in")}>
        Use an existing account
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

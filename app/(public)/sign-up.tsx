import { StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { HelperText, Text } from "react-native-paper";
import { DividerWithText } from "../../src/components";
import { Button } from "../../src/components/buttons";
import { ControlledTextInput } from "../../src/components/inputs";
import { useUserContext } from "../../src/context";
import { isNil } from "../../src/utils";

type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const { signUpWithPassword } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, control } = useForm<FormFieldsType>();

  const signUp = useCallback(
    async (values: FormFieldsType) => {
      try {
        setIsLoading(true);
        await signUpWithPassword(values);
      } catch (err) {
        if (err?.hasOwnProperty?.("message"))
          // @ts-ignore - the hasOwnProperty checks for existence of the "message" property
          setError(err.message?.toString?.());
      } finally {
        setIsLoading(false);
      }
    },
    [signUpWithPassword],
  );

  const onSubmit = (values: FormFieldsType) => {
    signUp(values);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.appTitle}>
        Life Points
      </Text>
      <Text variant="titleSmall" style={styles.appSubtitle}>
        Level Up Your Daily Routine
      </Text>

      <Text variant="titleMedium" style={styles.title}>
        Create a New Account
      </Text>
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
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
      >
        Sign Up
      </Button>
      {!isNil(error) && <HelperText type="error">{error}</HelperText>}
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
    height: "100%",
    padding: 16,
    gap: 8,
  },
  appTitle: { alignSelf: "center", textAlign: "center", marginTop: 60 },
  appSubtitle: { alignSelf: "center", textAlign: "center", marginBottom: 40 },
  title: { alignSelf: "center" },
});

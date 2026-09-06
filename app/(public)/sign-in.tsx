import { Image, StyleSheet, View } from "react-native";

import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native-paper";
import { DividerWithText } from "../../src/components";
import { Button } from "../../src/components/buttons";
import { ControlledTextInput } from "../../src/components/inputs";
import { useUserContext } from "../../src/context";
import { useAppTheme } from "../../src/theme";
import { CustomTheme } from "../../src/theme/types";
import { isNil } from "../../src/utils";

type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const router = useRouter();
  const { signInWithPassword } = useUserContext();
  const { handleSubmit, control } = useForm<FormFieldsType>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useAppTheme();
  const styles = getStyles(theme);

  const signIn = useCallback(
    async (values: FormFieldsType) => {
      try {
        setIsLoading(true);
        await signInWithPassword(values);
      } catch (err) {
        if (err?.hasOwnProperty?.("message"))
          // @ts-ignore - the hasOwnProperty checks for existence of the "message" property
          setError(err.message?.toString?.());
      } finally {
        setIsLoading(false);
      }
    },
    [signInWithPassword],
  );

  const onSubmit = (values: FormFieldsType) => {
    signIn(values);
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
        Log In
      </Button>
      {!isNil(error) && <Text style={styles.errorText}>{error}</Text>}
      <DividerWithText text="OR" />
      <Button
        color="secondary"
        icon={() => (
          <Image
            style={{ width: 18, height: 24 }}
            source={require("../../assets/images/UoL_icon.webp")}
          />
        )}
        // Credentials for test account which contains data - for UoL graders
        onPress={() => signIn({ email: "test@test.com", password: "test123" })}
      >
        Log In With Test Account
      </Button>
      <Button
        color="secondary"
        onPress={() => router.replace("/(public)/sign-up")}
      >
        Create New Account
      </Button>
    </View>
  );
}

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      padding: 16,
      gap: 8,
    },
    errorText: { color: theme.colors.error },
    textInput: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });

import { Button } from "@components/buttons";
import { useCustomizationContext, useUserContext } from "@context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { Appbar, Modal, Portal, Surface } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ActivitiesLayout() {
  const router = useRouter();
  const { logOut } = useUserContext();
  const [visible, setVisible] = useState(false);
  const { colorScheme, toggleColorScheme } = useCustomizationContext();

  return (
    <>
      <Stack
        screenOptions={{
          header: ({ navigation, options, back }) => (
            <Appbar.Header>
              {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
              <Appbar.Content title={options.title ?? ""} />
              <Appbar.Action icon="theme" onPress={() => setVisible(true)} />
            </Appbar.Header>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Goals",
            headerLeft: () => (
              <Pressable
                onPress={() => router.push("/goals/manage")}
                style={{ backgroundColor: "#ccc" }}
              >
                <FontAwesome name="cog" size={24} />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="manage" />
        <Stack.Screen name="create" />
        <Stack.Screen name="[id]/edit" />
        <Stack.Screen name="user-goals/[id]" />
        <Stack.Screen name="activities/manage" />
        <Stack.Screen name="activities/create" />
        <Stack.Screen name="activities/[id]/edit" />
      </Stack>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            margin: 24,
          }}
        >
          <Surface
            style={{
              padding: 20,
              borderRadius: 16,
              gap: 12,
            }}
          >
            <Button
              icon="theme-light-dark"
              onPress={() =>
                toggleColorScheme(colorScheme === "light" ? "dark" : "light")
              }
            >
              Change theme
            </Button>

            <Button icon="logout" onPress={() => logOut()}>
              Log out
            </Button>
          </Surface>
        </Modal>
      </Portal>
    </>
  );
}

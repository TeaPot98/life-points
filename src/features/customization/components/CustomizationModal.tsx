import { StyleSheet, View } from "react-native";
import { Modal, Portal, Surface, Text } from "react-native-paper";
import { IconWithBackground } from "../../../components";
import { Button } from "../../../components/buttons";
import { useCustomizationContext, useUserContext } from "../../../context";

export const CustomizationModal = () => {
  const { logOut, user } = useUserContext();
  const {
    toggleColorScheme,
    colorScheme,
    isCustomizationModalOpen,
    setCustomizationModalOpen,
  } = useCustomizationContext();

  return (
    <Portal>
      <Modal
        visible={isCustomizationModalOpen}
        onDismiss={() => setCustomizationModalOpen(false)}
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
          <View style={styles.userInfo}>
            <IconWithBackground
              iconSize={24}
              name="user"
              style={{ width: 50 }}
            />
            <Text variant="bodyMedium">{user?.email}</Text>
          </View>

          <Button
            icon="theme-light-dark"
            onPress={() =>
              toggleColorScheme(colorScheme === "light" ? "dark" : "light")
            }
          >
            Change theme
          </Button>

          <Button
            icon="logout"
            color="error"
            onPress={async () => {
              await logOut();
              setCustomizationModalOpen(false);
            }}
          >
            Log out
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});

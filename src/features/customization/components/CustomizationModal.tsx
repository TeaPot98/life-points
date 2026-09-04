import { Button } from "@components/buttons";
import { useCustomizationContext, useUserContext } from "@context";
import { Modal, Portal, Surface } from "react-native-paper";

export const CustomizationModal = () => {
  const { logOut } = useUserContext();
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
  );
};

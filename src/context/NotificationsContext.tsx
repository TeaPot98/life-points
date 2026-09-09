import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useAppTheme } from "../theme";
import { CustomTheme } from "../theme/types";

type NotificationData = {
  type?: "success" | "error";
  message?: string;
};

type NotificationsContextValue = {
  triggerNotification: (data: NotificationData | void) => void;
};

export const NotificationsContext = createContext<NotificationsContextValue>({
  triggerNotification: () => {},
});

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const [successMessage, setSuccessMessage] = useState("Success!");
  const [errorMessage, setErrorMessage] = useState("Some error occured");
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [isErrorVisible, setErrorVisible] = useState(false);

  const triggerNotification = useCallback((data: NotificationData | void) => {
    if (!data) {
      setSuccessVisible(true);

      return;
    }

    const { type = "success", message } = data;

    if (type === "success") {
      setSuccessVisible(true);
      if (message) setSuccessMessage(message);
      return;
    }

    if (type === "error") {
      setErrorVisible(true);
      if (message) setErrorMessage(message);
    }
  }, []);

  return (
    <NotificationsContext value={{ triggerNotification }}>
      {children}
      <Snackbar
        visible={isSuccessVisible}
        onDismiss={() => {
          setSuccessVisible(false);
          // Wait for the snackbar to hide before resetting the message
          setTimeout(() => setSuccessMessage("Success!"), 500);
        }}
        duration={3000}
        style={styles.success}
        theme={{
          colors: {
            inverseSurface: theme.colors.surface,
            inverseOnSurface: theme.colors.success,
          },
        }}
        elevation={0}
      >
        {successMessage}
      </Snackbar>
      <Snackbar
        visible={isErrorVisible}
        onDismiss={() => {
          setErrorVisible(false);
          // Wait for the snackbar to hide before resetting the message
          setTimeout(() => setErrorMessage("Some error occured"), 500);
        }}
        duration={3000}
        elevation={0}
        style={styles.error}
        theme={{
          colors: {
            inverseSurface: theme.colors.surface,
            inverseOnSurface: theme.colors.error,
          },
        }}
      >
        {errorMessage}
      </Snackbar>
    </NotificationsContext>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    success: {
      borderColor: theme.colors.success,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
    },
    error: {
      borderColor: theme.colors.error,
      borderWidth: 2,
      borderBottomWidth: 4,
      borderRightWidth: 4,
    },
  });

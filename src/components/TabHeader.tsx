import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useCustomizationContext, useUserContext } from "../context";
import { useAppTheme } from "../theme";
import { CustomTheme } from "../theme/types";
import { Chip } from "./Chip";

type TabHeaderProps = {
  title: string | undefined;
  canGoBack: boolean;
  onGoBack?: () => void;
};

export const TabHeader = ({ canGoBack, title, onGoBack }: TabHeaderProps) => {
  const { userData } = useUserContext();
  const { setCustomizationModalOpen } = useCustomizationContext();

  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <Appbar.Header style={styles.container}>
      {canGoBack ? <Appbar.BackAction onPress={onGoBack} /> : null}
      <Appbar.Content titleStyle={styles.title} title={title ?? ""} />
      <Chip icon="diamond">{userData?.points}</Chip>
      <Appbar.Action
        icon="cog"
        onPress={() => setCustomizationModalOpen(true)}
      />
    </Appbar.Header>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      borderBottomWidth: 2,
      borderColor: theme.colors.outlineVariant,
    },
    title: {
      color: theme.colors.onSurface,
    },
  });

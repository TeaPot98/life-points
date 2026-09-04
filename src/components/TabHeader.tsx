import { useCustomizationContext } from "@context";
import { Appbar } from "react-native-paper";

type TabHeaderProps = {
  title: string | undefined;
  canGoBack: boolean;
  onGoBack?: () => void;
};

export const TabHeader = ({ canGoBack, title, onGoBack }: TabHeaderProps) => {
  const { setCustomizationModalOpen } = useCustomizationContext();

  return (
    <Appbar.Header>
      {canGoBack ? <Appbar.BackAction onPress={onGoBack} /> : null}
      <Appbar.Content title={title ?? ""} />
      <Appbar.Action
        icon="theme"
        onPress={() => setCustomizationModalOpen(true)}
      />
    </Appbar.Header>
  );
};

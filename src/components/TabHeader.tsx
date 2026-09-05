import { useCustomizationContext, useUserContext } from "@context";
import { Appbar } from "react-native-paper";
import { Chip } from "./Chip";

type TabHeaderProps = {
  title: string | undefined;
  canGoBack: boolean;
  onGoBack?: () => void;
};

export const TabHeader = ({ canGoBack, title, onGoBack }: TabHeaderProps) => {
  const { userData } = useUserContext();
  const { setCustomizationModalOpen } = useCustomizationContext();

  return (
    <Appbar.Header>
      {canGoBack ? <Appbar.BackAction onPress={onGoBack} /> : null}
      <Appbar.Content title={title ?? ""} />
      <Chip icon="diamond">{userData?.points}</Chip>
      <Appbar.Action
        icon="cog"
        onPress={() => setCustomizationModalOpen(true)}
      />
    </Appbar.Header>
  );
};

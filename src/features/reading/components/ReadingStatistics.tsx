import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Card } from "../../../components";
import { Button } from "../../../components/buttons";
import { useBooksContext } from "../../../context";
import { useAppTheme } from "../../../theme";
import { CustomTheme } from "../../../theme/types";
import { IReadingStatistics } from "../../../types/books";

type ReadingStatisticsProps = {
  readingStatistics: IReadingStatistics | undefined;
};

export const ReadingStatistics = ({
  readingStatistics,
}: ReadingStatisticsProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { setReadingTrackerModalOpen, readingTracker } = useBooksContext();

  if (!readingStatistics) return;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View>
          <Text variant="titleMedium">
            Total books: {readingStatistics?.total_books}
          </Text>
          <Text>Last book: {readingStatistics?.last_book?.title ?? "N/A"}</Text>
          <Text>Reward per page: {readingTracker?.reward_per_page ?? 0}</Text>
        </View>
        <Button
          color="secondary"
          onPress={() => setReadingTrackerModalOpen(true)}
        >
          <FontAwesome name="cog" size={16} />
        </Button>
      </Card.Content>
    </Card>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surfaceVariant,
      borderColor: theme.colors.onSurfaceVariant,
    },
    cardContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });

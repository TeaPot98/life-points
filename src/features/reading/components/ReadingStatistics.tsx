import { Card } from "@components";
import { Button } from "@components/buttons";
import { useBooksContext } from "@context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IReadingStatistics } from "@local-types/books";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type ReadingStatisticsProps = {
  readingStatistics: IReadingStatistics | undefined;
};

export const ReadingStatistics = ({
  readingStatistics,
}: ReadingStatisticsProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);
  const { setReadingTrackerModalOpen } = useBooksContext();

  if (!readingStatistics) return;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View>
          <Text variant="titleMedium">
            Total books: {readingStatistics?.total_books}
          </Text>
          <Text>Last book: {readingStatistics?.last_book?.title}</Text>
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
    },
  });

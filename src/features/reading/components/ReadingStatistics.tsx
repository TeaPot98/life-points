import { Card } from "@components";
import { IReadingStatistics } from "@local-types/books";
import { useAppTheme } from "@theme";
import { CustomTheme } from "@theme/types";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type ReadingStatisticsProps = {
  readingStatistics: IReadingStatistics | undefined;
};

export const ReadingStatistics = ({
  readingStatistics,
}: ReadingStatisticsProps) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  if (!readingStatistics) return;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">
          Total books: {readingStatistics?.total_books}
        </Text>
        <Text>Last book: {readingStatistics?.last_book?.title}</Text>
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
  });

import { IReadingStatistics } from "@local-types/books";
import { View } from "react-native";
import { Text } from "react-native-paper";

type ReadingStatisticsProps = {
  readingStatistics: IReadingStatistics | undefined;
};

export const ReadingStatistics = ({
  readingStatistics,
}: ReadingStatisticsProps) => {
  return (
    <View>
      <Text>Total books: {readingStatistics?.total_books}</Text>
      <Text>Last book: {readingStatistics?.last_book?.title}</Text>
    </View>
  );
};

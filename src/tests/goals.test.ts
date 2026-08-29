import MockData from "@data";
import { computeGoalCompletionPercentage } from "@utils/goals";
import dayjs from "dayjs";

describe("computeGoalCompletionPercentage", () => {
  it("computes time-based goal percentage", () => {
    jest.useFakeTimers();
    jest.setSystemTime(
      dayjs(MockData.userGoals.time.started_at).add(15, "minutes").toDate(),
    );

    const percentage = computeGoalCompletionPercentage(MockData.userGoals.time);

    expect(percentage).toBeCloseTo(50);
  });
  it("computes count-based goal percentage", () => {
    const percentage = computeGoalCompletionPercentage(
      MockData.userGoals.count,
    );

    expect(percentage).toBeCloseTo(60);
  });
  it("computes milestone-based goal percentage", () => {
    const percentage = computeGoalCompletionPercentage(
      MockData.userGoals.milestone,
    );

    expect(percentage).toBeCloseTo((2 * 100) / 3);
  });
});

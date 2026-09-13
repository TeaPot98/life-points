import dayjs from "dayjs";
import MockData from "../data";
import {
  computeGoalCompletionPercentage,
  computeTimeGoalCompletion,
} from "../utils/goals";

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

describe("computeTimeGoalCompletion", () => {
  it("computes the value correctly", () => {
    const completion = computeTimeGoalCompletion(
      dayjs().subtract(0.5, "hour").toISOString(),
      3600,
    );

    expect(completion).toBeCloseTo(0.5);
  });
  it("outputs a value between 0 and 1", () => {
    const overshootCompletion = computeTimeGoalCompletion(
      dayjs().subtract(1, "hour").toISOString(),
      1800,
    );
    const justStartedCompletion = computeTimeGoalCompletion(
      dayjs().toISOString(),
      1800,
    );

    expect(overshootCompletion).toBeCloseTo(1);
    expect(justStartedCompletion).toBeCloseTo(0);
  });
});

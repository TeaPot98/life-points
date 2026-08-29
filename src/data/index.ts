import {
  countUserGoal,
  milestoneUserGoal,
  mockUserGoals,
  timeUserGoal,
} from "./user-goals.mock";

const MockData = {
  userGoals: {
    list: mockUserGoals,
    count: countUserGoal,
    time: timeUserGoal,
    milestone: milestoneUserGoal,
  },
};

export default MockData;

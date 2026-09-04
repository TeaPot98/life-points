import { IUserGoal } from "@local-types/goals";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type GoalsContextValue = {
  goalToEdit: IUserGoal | null;
  setGoalToEdit: (goal: IUserGoal | null) => void;
  isCountGoalModalOpen: boolean;
  setCountGoalModalOpen: (open: boolean) => void;
};

export const GoalsContext = createContext<GoalsContextValue>({
  goalToEdit: null,
  setGoalToEdit: () => {},
  isCountGoalModalOpen: false,
  setCountGoalModalOpen: () => {},
});

export const useGoalsContext = () => useContext(GoalsContext);

export const GoalsContextProvider = ({ children }: PropsWithChildren) => {
  const [goalToEdit, setGoalToEdit] = useState<IUserGoal | null>(null);
  const [isCountGoalModalOpen, setCountGoalModalOpen] = useState(false);

  return (
    <GoalsContext
      value={{
        goalToEdit,
        setGoalToEdit,
        isCountGoalModalOpen,
        setCountGoalModalOpen,
      }}
    >
      {children}
    </GoalsContext>
  );
};

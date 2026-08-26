import { View } from "@components/Themed";
import { IDraftMilestone } from "@local-types/goals";
import { useState } from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Button, Text, TextInput } from "react-native-paper";

const EMPTY_MILESTONE = {
  name: "",
  reward: 0,
} satisfies IDraftMilestone;

type FormInputValue = {
  reward: number;
  milestones: IDraftMilestone[];
};

type MilestonesInputProps = {
  control: Control<FormInputValue>;
  controllerProps?: Omit<
    ControllerProps<FormInputValue, "milestones">,
    "control" | "render" | "name"
  >;
};

export const MilestonesInput = ({
  control,
  controllerProps,
}: MilestonesInputProps) => {
  const [newMilestone, setNewMilestone] = useState<IDraftMilestone | null>(
    null,
  );

  const addNewMilestone = () => {
    setNewMilestone(EMPTY_MILESTONE);
  };

  return (
    <Controller
      name="milestones"
      control={control}
      {...controllerProps}
      render={({ field: { onChange, value = [] } }) => (
        <View>
          {value.map((milestone, index) => (
            <View key={index}>
              <Text>{milestone.name}</Text>
              <Text>{milestone.reward}</Text>
            </View>
          ))}
          {newMilestone && (
            <View>
              <TextInput
                value={newMilestone.name}
                onChangeText={(name) =>
                  setNewMilestone((prev) => ({
                    reward: prev?.reward ?? 0,
                    name,
                  }))
                }
              />
              <TextInput
                value={newMilestone.reward.toString()}
                onChangeText={(reward) =>
                  setNewMilestone((prev) => ({
                    name: prev?.name ?? "",
                    reward: Number(reward),
                  }))
                }
              />
              <Button
                onPress={() => {
                  onChange([...value, newMilestone]);
                  setNewMilestone(null);
                }}
              >
                Save
              </Button>
            </View>
          )}
          {newMilestone === null && (
            <Button onPress={addNewMilestone}>Add new milestone</Button>
          )}
        </View>
      )}
    />
  );
};

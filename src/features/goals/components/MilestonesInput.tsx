import { NumberInput } from "@components/NumberInput";
import { IDraftMilestone } from "@local-types/goals";
import { useState } from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { View } from "react-native";
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
  // const [editMilestoneIndex, setEditMilestoneIndex] = useState<number | null>(
  //   null,
  // );
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
          {value?.map((milestone, index) => (
            <View key={index}>
              {/* {index === editMilestoneIndex ? (
                <MilestoneInput
                  name={milestone.name}
                  reward={milestone.reward}
                  onNameChange={(name) =>
                    onChange(
                      value?.map((prevMilestone, idx) =>
                        idx === index
                          ? {
                              ...prevMilestone,
                              name,
                            }
                          : prevMilestone,
                      ),
                    )
                  }
                  onRewardChange={(reward) =>
                    onChange(
                      value?.map((prevMilestone, idx) =>
                        idx === index
                          ? {
                              ...prevMilestone,
                              reward: Number(reward),
                            }
                          : prevMilestone,
                      ),
                    )
                  }
                  onSave={() => {
                    setEditMilestoneIndex(null);
                    setNewMilestone(null);
                  }}
                />
              ) : ( */}
              <View>
                <Text>{milestone.name}</Text>
                <Text>{milestone.reward}</Text>
                {/* <Button
                  onPress={() => {
                    setNewMilestone(null);
                    setEditMilestoneIndex(index);
                  }}
                >
                  Edit
                </Button> */}
              </View>
              {/* )} */}
            </View>
          ))}
          {newMilestone && (
            <MilestoneInput
              name={newMilestone.name}
              reward={newMilestone.reward}
              onNameChange={(name) =>
                setNewMilestone((prev) => ({
                  reward: prev?.reward ?? 0,
                  name,
                }))
              }
              onRewardChange={(reward) =>
                setNewMilestone((prev) => ({
                  name: prev?.name ?? "",
                  reward: Number(reward),
                }))
              }
              onSave={() => {
                onChange([...value, newMilestone]);
                setNewMilestone(null);
              }}
            />
          )}
          {newMilestone === null && (
            <Button onPress={addNewMilestone}>Add new milestone</Button>
          )}
        </View>
      )}
    />
  );
};

type MilestoneInputProps = {
  name: string;
  reward: number;
  onNameChange: (value: string) => void;
  onRewardChange: (value: number) => void;
  onSave: () => void;
};

const MilestoneInput = ({
  name,
  onNameChange,
  onRewardChange,
  onSave,
  reward,
}: MilestoneInputProps) => {
  return (
    <View>
      <TextInput value={name} onChangeText={onNameChange} />
      <NumberInput
        value={reward}
        onChange={(reward) => onRewardChange(reward)}
      />
      <Button onPress={onSave}>Save</Button>
    </View>
  );
};

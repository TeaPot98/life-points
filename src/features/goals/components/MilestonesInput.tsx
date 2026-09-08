import { useState } from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { Card, Chip, SectionDivider } from "../../../components";
import { Button } from "../../../components/buttons";
import { NumberInput, TextInput } from "../../../components/inputs";
import { IDraftMilestone } from "../../../types/goals";

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
        <View style={styles.container}>
          {value?.length && <SectionDivider text="Milestones" />}
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
              <Card>
                <Card.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text variant="bodyLarge">{milestone.name}</Text>
                  <Chip icon="diamond">{milestone.reward}</Chip>
                </Card.Content>
                {/* <Button
                  onPress={() => {
                    setNewMilestone(null);
                    setEditMilestoneIndex(index);
                  }}
                >
                  Edit
                </Button> */}
              </Card>
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
            <Button icon="plus" color="secondary" onPress={addNewMilestone}>
              Add new milestone
            </Button>
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
  onRewardChange: (value: number | "") => void;
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
    <View style={styles.milestoneInput}>
      <SectionDivider text="New Milestone" />
      <TextInput label="Name" value={name} onChangeText={onNameChange} />
      <NumberInput
        label="Reward"
        value={reward}
        onChange={(reward) => onRewardChange(reward)}
      />
      <Button onPress={onSave}>Add Milestone</Button>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  milestoneInput: {
    gap: 8,
  },
});

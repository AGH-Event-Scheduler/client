import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton, ButtonSize } from "./AppButton";

interface ToggleButtonItem {
  key: any;
  title: string;
}

interface ToggleButtonProps {
  items: ToggleButtonItem[];
  currentSelection: ToggleButtonItem;
  onSelect: (item: ToggleButtonItem) => void;
  size: ButtonSize;
}

export const AppToggleButton = ({
  items,
  currentSelection,
  onSelect,
  size,
}: ToggleButtonProps) => {
  const [selected, setSelected] = useState(currentSelection);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <View style={styles.button}>
      {items.map((item) => (
        <AppButton
          key={item.key}
          title={item.title}
          type={selected.key == item.key ? "toggleChecked" : "toggleDefault"}
          onPress={() => handleSelect(item)}
          size={size}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

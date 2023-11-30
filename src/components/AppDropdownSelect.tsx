import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface DropdownSelectData {
  index: any;
  value: string;
}

export interface DropdownSelectProps {
  data: DropdownSelectData[];
  currentItem: DropdownSelectData;
  onItemSelect: (item: DropdownSelectData) => void;
  dropdownContainerStyle?: any;
  fontSize?: number;
}

export const AppDropdownSelect = ({
  data,
  currentItem,
  onItemSelect,
  dropdownContainerStyle,
  fontSize = 14,
}: DropdownSelectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(currentItem);

  const handlePress = () => {
    setIsExpanded((previousState) => !previousState);
  };
  const handleExpandedPress = (item: DropdownSelectData) => {
    setSelectedItem(item);
    onItemSelect(item);
    setIsExpanded(false);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ ...styles.button, ...dropdownContainerStyle }}>
          <Text style={{ ...styles.text, fontSize: fontSize }}>
            {selectedItem.value}
          </Text>
          {isExpanded ? (
            <Feather name={"chevron-up"} size={20} color="black" />
          ) : (
            <Feather name={"chevron-down"} size={20} color="black" />
          )}
        </View>
      </TouchableWithoutFeedback>
      {isExpanded ? (
        <View style={{ ...styles.expanded, ...dropdownContainerStyle }}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.index}
              style={styles.buttonExpanded}
              onPress={() => handleExpandedPress(item)}
            >
              <Text style={{ ...styles.text, fontSize: fontSize }}>
                {item.value}
              </Text>
              {item.index === selectedItem.index ? (
                <Feather name={"check"} size={14} color="black" />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#D6D6D6",
    minWidth: 120,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    marginRight: "auto",
  },
  expanded: {
    position: "absolute",
    top: 28,
    backgroundColor: "#D6D6D6",
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 100,
  },
  buttonExpanded: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 120,
  },
});

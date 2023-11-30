import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
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

export interface CenteredModalDropdownProps {
  data: DropdownSelectData[];
  currentItem: DropdownSelectData;
  onItemSelect: (item: DropdownSelectData) => void;
  dropdownContainerStyle?: any;
  fontSize?: number;
}

export const CenteredModalDropdown = ({
  data,
  currentItem,
  onItemSelect,
  fontSize = 14,
}: CenteredModalDropdownProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(currentItem);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleExpandedPress = (item: DropdownSelectData) => {
    setSelectedItem(item);
    onItemSelect(item);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={{ ...styles.button }}>
          <Text style={{ ...styles.text, fontSize: fontSize }}>
            {selectedItem.value}
          </Text>
          {isModalVisible ? (
            <Feather name={"chevron-up"} size={20} color="black" />
          ) : (
            <Feather name={"chevron-down"} size={20} color="black" />
          )}
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={{ ...styles.expanded }}>
              {data.map((item) => (
                <TouchableOpacity
                  key={item.index}
                  style={styles.buttonExpanded}
                  onPress={() => handleExpandedPress(item)}
                >
                  <Text style={{ ...styles.text, fontSize: 12 }}>
                    {item.value}
                  </Text>
                  {item.index === selectedItem.index ? (
                    <Feather name={"check"} size={14} color="black" />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#016531",
    minWidth: 120,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    marginRight: "auto",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  expanded: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
    width: "80%",
    borderWidth: 2,
    borderColor: "#016531",
    minHeight: 120,
    maxHeight: "60%",
  },
  buttonExpanded: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    padding: 10,
    minWidth: 120,
  },
});

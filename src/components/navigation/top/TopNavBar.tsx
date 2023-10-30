import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface TopNavBarProps {
  leftSection?: JSX.Element;
  rightSection?: JSX.Element;
  title: string;
  style?: any;
}

export const TopNavBar = ({
  leftSection = undefined,
  rightSection = undefined,
  title,
  style = undefined,
}) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <View style={styles.leftSectionStyle}>{leftSection}</View>
      <View style={styles.titleSectionStyle}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>
      <View style={styles.leftSectionStyle}>{rightSection}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 5,
  },
  leftSectionStyle: {
    flex: 0,
    alignSelf: "flex-start",
  },
  titleSectionStyle: {
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 10,
  },
  rightSectionStyle: {
    flex: 0,
    alignSelf: "flex-end",
  },
});

import { TextInput, Text, StyleSheet, Platform } from "react-native";
import { globalStyles } from "../styles/GlobalStyles";
import React from "react";

export const AppSelectableText = ({ text }) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <TextInput
          style={styles.text}
          value={text}
          editable={false}
          multiline={true}
        />
      ) : (
        <Text style={styles.text} selectable>
          {text}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.description,
    marginBottom: 10,
  },
});

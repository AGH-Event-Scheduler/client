import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardAwareScrollViewComponent = ({
  containerStyles,
  children,
}: {
  containerStyles?: any;
  children: any;
}) => {
  return (
    <KeyboardAwareScrollView>
      <View style={[styles.container, containerStyles]}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

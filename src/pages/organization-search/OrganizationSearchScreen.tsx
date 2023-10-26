import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "../../components/SearchBar";

export const OrganizationSearchScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SearchBar autoFocus />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  imageContainer: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    maxHeight: 200,
  },
});

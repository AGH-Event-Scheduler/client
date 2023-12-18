import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps {
  style?: any;
  onSearchChange?: (searchTerm: string) => void;
  autoFocus?: boolean;

  notEditable?: boolean;
  onPress?: () => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (props.onSearchChange) {
        props.onSearchChange(searchTerm);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  if (props.notEditable) {
    return (
      <TouchableOpacity style={[props.style]} onPress={props.onPress}>
        <View style={[styles.searchInput, styles.searchButton]}>
          <Text style={[styles.searchButtonText]}>
            {t("searchbar.placeholder")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TextInput
      autoFocus={props.autoFocus}
      editable={true}
      style={[styles.searchInput, props.style]}
      placeholder={t("searchbar.placeholder")}
      onChangeText={(e) => {
        setSearchTerm(e);
      }}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchButton: {
    fontSize: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  searchButtonText: {
    color: "#CCCCCC",
  },
});

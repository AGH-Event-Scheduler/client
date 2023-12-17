import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AppSwitchButton } from "../../components/AppSwitchButton";
import { SettingProps } from "./SettingsView";
import { AppNewPageButton } from "../../components/AppNewPageButton";
import i18next from "../../localization/i18next";
import {
  AppDropdownSelect,
  DropdownSelectData,
} from "../../components/AppDropdownSelect";
import { languages } from "../../localization/languages";

export const SettingCard = ({ title, iconName, setting }: SettingProps) => {
  const handleItemSelect = (code: string) => {
    i18next.changeLanguage(code);
  };

  const SettingTypeButton = {
    Account: <AppNewPageButton page={setting} />,
    Information: <AppNewPageButton page={setting} />,
    Language: (
      <AppDropdownSelect
        data={mapLanguagesToDropdownSelectData()}
        currentItem={mapCurrentLanguageToDropdownSelectData()}
        onItemSelect={(item: DropdownSelectData) =>
          handleItemSelect(item.index)
        }
      />
    ),
    ChangePassword: <AppNewPageButton page={setting} />,
  };

  return (
    <View
      style={[styles.menuItem, setting === "Language" ? { zIndex: 1 } : {}]}
    >
      <View style={styles.iconText}>
        <Feather name={iconName} size={24} color="black" />
        <Text style={styles.menuText}>{title}</Text>
      </View>
      {SettingTypeButton[setting]}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "20%",
    paddingVertical: 10,
  },
  menuText: {
    paddingTop: 1,
    fontSize: 18,
    fontWeight: "400",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 25,
    minWidth: "30%",
  },
});

const mapLanguagesToDropdownSelectData = (): DropdownSelectData[] => {
  return languages.map<DropdownSelectData>((language) => {
    return { index: language.index, value: language.translation };
  });
};

const mapCurrentLanguageToDropdownSelectData = (): DropdownSelectData => {
  return {
    index: i18next.language,
    value: i18next.t(`languages.${i18next.language}`),
  };
};

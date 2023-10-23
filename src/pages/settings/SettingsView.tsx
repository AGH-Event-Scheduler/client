import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { SettingCard } from "./SettingCard";

export interface SettingProps {
  title: string;
  iconName: any;
  setting: SettingType;
}

export enum SettingType {
  Account = "Account",
  Language = "Language",
  Notifications = "Notifications",
  DarkMode = "Darkmode",
  Information = "Information",
}

export const SettingsView = () => {
  const { t } = useTranslation();

  const settingsList: SettingProps[] = [
    {
      title: t("settings.account"),
      iconName: "user",
      setting: SettingType.Account,
    },
    {
      title: t("settings.language"),
      iconName: "type",
      setting: SettingType.Language,
    },
    {
      title: t("settings.notifications"),
      iconName: "bell",
      setting: SettingType.Notifications,
    },
    {
      title: t("settings.dark-mode"),
      iconName: "moon",
      setting: SettingType.DarkMode,
    },
    {
      title: t("settings.information"),
      iconName: "info",
      setting: SettingType.Information,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("general.settings")}</Text>
      <View style={[styles.settingsList, { zIndex: 10 }]}>
        {settingsList.map((item) => (
          <SettingCard
            key={item.title}
            title={item.title}
            iconName={item.iconName}
            setting={item.setting}
          ></SettingCard>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#B0BCC4",
  },
  settingsList: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});

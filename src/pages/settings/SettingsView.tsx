import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SettingCard } from "./SettingCard";
import { AppDivider } from "../../components/AppDivider";
import { LogoutCard } from "./LogoutCard";
import { AccountSection } from "./AccountSection";

export interface SettingProps {
  title: string;
  iconName: any;
  setting: SettingType;
}

export enum SettingType {
  Language = "Language",
  Notifications = "Notifications",
  Information = "Information",
  Logout = "Logout",
  Email = "Email",
  ChangePassword = "ChangePassword",
}

export const SettingsView = () => {
  const { t } = useTranslation();

  const settingsList: SettingProps[] = [
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
      title: t("settings.information"),
      iconName: "info",
      setting: SettingType.Information,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.settingsList, { zIndex: 10 }]}>
        <AccountSection />
        <AppDivider />
        {settingsList.map((item) => (
          <SettingCard
            key={item.title}
            title={item.title}
            iconName={item.iconName}
            setting={item.setting}
          ></SettingCard>
        ))}
        <AppDivider />
        <View style={styles.logoutCard}>
          <LogoutCard />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  settingsList: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    paddingVertical: 20,
  },
  logoutCard: {
    alignSelf: "flex-end",
  },
});

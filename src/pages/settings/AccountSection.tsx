import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { SettingProps, SettingType } from "./SettingsView";
import { SettingCard } from "./SettingCard";
import { fetchUser } from "../../api/authentication-api-utils";
import { User } from "../../api/types";

export const AccountSection = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    lastname: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const user = (await fetchUser()) as User;
      setUser(user);
    };

    getUser();
  }, []);

  const accountList: SettingProps[] = [
    {
      title: user.email,
      iconName: "mail",
      setting: SettingType.Email,
    },
    {
      title: t("settings.account.change-password"),
      iconName: "lock",
      setting: SettingType.ChangePassword,
    },
  ];

  return (
    <View style={styles.accountList}>
      <View style={styles.helloContainer}>
        <Text style={styles.helloPart1}>{t("settings.account.hello")}</Text>
        <Text style={styles.helloPart2}>{user.name}!</Text>
      </View>
      {accountList.map((item) => (
        <SettingCard
          key={item.title}
          title={item.title}
          iconName={item.iconName}
          setting={item.setting}
        ></SettingCard>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  accountList: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  helloContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  helloPart1: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 30,
  },
  helloPart2: {
    color: "#016531",
    fontWeight: "bold",
    fontSize: 30,
    textTransform: "capitalize",
  },
});

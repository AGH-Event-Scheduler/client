import { Feather } from "@expo/vector-icons"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { AppSwitchButton } from "../../components/AppSwitchButton"
import { SettingProps } from "./SettingsView"
import { AppNewPageButton } from "../../components/AppNewPageButton"
import i18next from "../../localization/i18next"

export const SettingCard = ({ title, iconName, setting }: SettingProps) => {
  const SettingTypeButton = {
    Account: <AppNewPageButton page={setting} />,
    Information: <AppNewPageButton page={setting} />,
    Language: <AppSwitchButton onToggle={() => changeLanguage()} isEnabled={i18next.language == "pl"} />,
    Notifications: <AppSwitchButton onToggle={() => console.log("switch toggled")} isEnabled={false}/>,
    Darkmode: <AppSwitchButton onToggle={() => console.log("switch toggled")} isEnabled={false}/>,
  }

  const changeLanguage = () =>
    i18next.language == "pl" 
      ? i18next.changeLanguage("en") 
      : i18next.changeLanguage("pl");

  return (
    <View style={styles.menuItem}>
      <View style={styles.iconText}>
        <Feather
          name={iconName}
          size={24}
          color="black"
        />
        <Text style={styles.menuText}>{title}</Text>
      </View>
    { SettingTypeButton[setting] }      
    </View>       
  )
}

const styles = StyleSheet.create({
  menuItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    minWidth: "20%",
    paddingVertical: 10,
  },
  menuText: {
    paddingTop: 3,
    fontSize: 16,
    fontWeight: "400",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 25,
    minWidth: "30%"
  }
});
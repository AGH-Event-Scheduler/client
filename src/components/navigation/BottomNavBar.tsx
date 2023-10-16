import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export const BottomNavBar = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuItem}>
        <Feather name="star" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.menuText}>{t('general.favourite')}</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather name="users" size={24} color="black" style={styles.menuIcon} />
        <Text style={styles.menuText}>{t('general.organizations')}</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather
          name="calendar"
          size={24}
          color="black"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>{t('general.calendar')}</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather
          name="feather"
          size={24}
          color="black"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>{t('general.feed')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  menuItem: {
    alignItems: "center",
    minWidth: "20%",
  },
  menuIcon: {
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});

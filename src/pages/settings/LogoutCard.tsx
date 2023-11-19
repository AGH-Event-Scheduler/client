import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { AuthenticationService } from "../../services/AuthenticationService";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { logout } from "../../api/authentication-api-utils";


export const LogoutCard = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

    const handleLogout = async () => {
      return await logout().then((loggedOut) => {
        if (loggedOut) {
          AuthenticationService.logout().then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              }),
            );
          });
        } else {
          Alert.alert("Error during logging out");
        }
      });
    }
    return (
        <TouchableOpacity
          style={[styles.menuItem]}
          onPress={handleLogout}
        >
          <View style={styles.iconText}>
            <Text style={styles.menuText}>{t('settings.logout')}</Text>
            <Feather name={'log-out'} size={24} color="black" />
          </View>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    menuItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minWidth: "20%",
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
      gap: 16,
      minWidth: "30%",
    },
  });
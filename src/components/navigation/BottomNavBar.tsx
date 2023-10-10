import React from "react";
import { StyleSheet, View } from "react-native";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NavBarButton } from "./BottomNavBarButton";

export const resetToRouteName = (
  navigation: NavigationProp<any>,
  routeName: string,
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    }),
  );
};

export const BottomNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menuContainer}>
      <NavBarButton
        name="Favourite"
        iconName="star"
        onPress={() => {
          resetToRouteName(navigation, "Favourite");
        }}
      />
      <NavBarButton
        name="Organizations"
        iconName="users"
        onPress={() => {
          resetToRouteName(navigation, "Organizations");
        }}
      />
      <NavBarButton
        name="Calendar"
        iconName="calendar"
        onPress={() => {
          resetToRouteName(navigation, "Calendar");
        }}
      />
      <NavBarButton
        name="Feed"
        iconName="feather"
        onPress={() => {
          resetToRouteName(navigation, "Feed");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
    borderColor: "#B0BCC3",
    borderTopWidth: 1,
    width: "100%",
  },
});

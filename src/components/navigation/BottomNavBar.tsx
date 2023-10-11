import React, { useState } from "react";
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

export interface DisplayBottomNavBarButton {
  key: string;
  iconName: string;
  routeName: string;
}

export const BottomNavBar = () => {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(false);

  const expandNavBar = () => {
    setExpanded(!expanded);
  };

  // TODO: Refactor once users are introduced
  const buttonsToDisplay: DisplayBottomNavBarButton[] = [
    { key: "Favourite", iconName: "star", routeName: "Favourite" },
    { key: "Organizations", iconName: "users", routeName: "Organizations" },
    { key: "Calendar", iconName: "calendar", routeName: "Calendar" },
    { key: "Feed", iconName: "feather", routeName: "Feed" },
    {
      key: "Create organization",
      iconName: "plus",
      routeName: "Create organization",
    },
    {
      key: "Your organizations",
      iconName: "user-check",
      routeName: "Your organizations",
    },
  ];

  const maxNumerInRow = 4;
  var bottomRow = [...buttonsToDisplay].splice(0, maxNumerInRow);
  var topRow = [...buttonsToDisplay].splice(maxNumerInRow);
  // END TODO: Refactor once users are introduced

  return (
    <View style={styles.menuContainer}>
      <View style={expanded ? styles.row : { display: "none" }}>
        {topRow.map((buttonToDisplay) => (
          <NavBarButton
            name={buttonToDisplay.key}
            iconName={buttonToDisplay.iconName}
            onPress={() => {
              resetToRouteName(navigation, buttonToDisplay.routeName);
            }}
          />
        ))}
      </View>
      <View style={styles.row}>
        {bottomRow.map((buttonToDisplay) => (
          <NavBarButton
            name={buttonToDisplay.key}
            iconName={buttonToDisplay.iconName}
            onPress={() => {
              resetToRouteName(navigation, buttonToDisplay.routeName);
            }}
          />
        ))}
        {topRow.length > 0 ? (
          <NavBarButton
            name="More"
            iconName="arrow-up"
            onPress={() => {
              expandNavBar();
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    borderColor: "#B0BCC3",
    borderTopWidth: 1,
    width: "100%",
    gap: 5,
    paddingTop: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

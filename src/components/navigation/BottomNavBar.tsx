import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NavBarButton } from "./BottomNavBarButton";
import HideWithKeyboard from "react-native-hide-with-keyboard";

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
  name: string;
  iconName: string;
  routeName: string;
}

export const BottomNavBar = () => {
  const navigation = useNavigation();

  const [isExpanded, setIsExpanded] = useState(false);

  const expandNavBar = () => {
    setIsExpanded(!isExpanded);
  };

  // TODO: Refactor once users are introduced
  const buttonsToDisplay: DisplayBottomNavBarButton[] = [
    { name: "Favourite", iconName: "star", routeName: "Favourite" },
    { name: "Organizations", iconName: "users", routeName: "Organizations" },
    { name: "Calendar", iconName: "calendar", routeName: "Calendar" },
    { name: "Feed", iconName: "feather", routeName: "Feed" },
    {
      name: "Create organization",
      iconName: "plus",
      routeName: "Create organization",
    },
    {
      name: "Your organizations",
      iconName: "user-check",
      routeName: "Your organizations",
    },
  ];

  const maxNumerInRow = 4;
  var bottomRow = [...buttonsToDisplay].splice(0, maxNumerInRow);
  var topRow = [...buttonsToDisplay].splice(maxNumerInRow);
  // END TODO: Refactor once users are introduced

  return (
    <HideWithKeyboard>
      <View style={styles.menuContainer}>
        <View style={isExpanded ? styles.row : { display: "none" }}>
          {topRow.map((buttonToDisplay, index) => (
            <NavBarButton
              key={index}
              name={buttonToDisplay.name}
              iconName={buttonToDisplay.iconName}
              onPress={() => {
                resetToRouteName(navigation, buttonToDisplay.routeName);
              }}
            />
          ))}
        </View>
        <View style={styles.row}>
          {bottomRow.map((buttonToDisplay, index) => (
            <NavBarButton
              key={index}
              name={buttonToDisplay.name}
              iconName={buttonToDisplay.iconName}
              onPress={() => {
                resetToRouteName(navigation, buttonToDisplay.routeName);
              }}
            />
          ))}
          {topRow.length > 0 ? (
            !isExpanded ? (
              <NavBarButton
                name="More"
                iconName="arrow-up"
                onPress={() => {
                  expandNavBar();
                }}
              />
            ) : (
              <NavBarButton
                name="Less"
                iconName="arrow-down"
                onPress={() => {
                  expandNavBar();
                }}
              />
            )
          ) : null}
        </View>
      </View>
    </HideWithKeyboard>
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

import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NavBarButton } from "./BottomNavBarButton";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { useTranslation } from "react-i18next";
import { useUserAuthorities } from "../../../services/UserContext";

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
  title: string;
  iconName: string;
  routeName: string;
}

export const BottomNavBar = ({ navbarVisible }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonsToDisplay, setButtonsToDisplay] = useState<
    DisplayBottomNavBarButton[]
  >([]);
  const { isAdmin, hasAnyOrganizationRole } = useUserAuthorities(navbarVisible);

  useEffect(() => {
    const fetchButtons = async () => {
      try {
        const commonButtons: DisplayBottomNavBarButton[] = [
          {
            title: t("general.favourite"),
            iconName: "star",
            routeName: "Favourite",
          },
          {
            title: t("general.organizations"),
            iconName: "users",
            routeName: "Organizations",
          },
          {
            title: t("general.calendar"),
            iconName: "calendar",
            routeName: "Calendar",
          },
          { title: t("general.feed"), iconName: "feather", routeName: "Feed" },
        ];

        const additionalButtons: DisplayBottomNavBarButton[] = [
          {
            title: t("general.create-organization"),
            iconName: "plus",
            routeName: "Create organization",
          },
          {
            title: t("general.your-organizations"),
            iconName: "user-check",
            routeName: "Your organizations",
          },
        ];

        let buttonsToDisplay: DisplayBottomNavBarButton[] = [];
        console.log("IS ADMIN  : ", isAdmin);
        if (isAdmin) {
          buttonsToDisplay = [...commonButtons, ...additionalButtons];
        } else if (!isAdmin && hasAnyOrganizationRole) {
          buttonsToDisplay = [
            ...commonButtons,
            {
              title: t("general.your-organizations"),
              iconName: "user-check",
              routeName: "Your organizations",
            },
          ];
        } else {
          buttonsToDisplay = commonButtons.filter(
            (button) =>
              button.routeName !== "Create organization" &&
              button.routeName !== "Your organizations",
          );
        }
        console.log("BUTTONS TO DISPLAY", buttonsToDisplay);
        setButtonsToDisplay(buttonsToDisplay);
      } catch (error) {
        console.error("Error fetching buttons:", error);
      }
    };

    fetchButtons();
  }, [isAdmin, hasAnyOrganizationRole]);

  const expandNavBar = () => {
    setIsExpanded(!isExpanded);
  };

  const maxNumerInRow = 4;
  // END TODO: Refactor once users are introduced

  return (
    <HideWithKeyboard>
      <View style={styles.menuContainer}>
        <View style={isExpanded ? styles.row : { display: "none" }}>
          {[...buttonsToDisplay]
            .splice(maxNumerInRow)
            .map((buttonToDisplay, index) => (
              <NavBarButton
                key={index}
                title={buttonToDisplay.title}
                iconName={buttonToDisplay.iconName}
                onPress={() => {
                  resetToRouteName(navigation, buttonToDisplay.routeName);
                }}
              />
            ))}
        </View>
        <View style={styles.row}>
          {[...buttonsToDisplay]
            .splice(0, maxNumerInRow)
            .map((buttonToDisplay, index) => (
              <NavBarButton
                key={index}
                title={buttonToDisplay.title}
                iconName={buttonToDisplay.iconName}
                onPress={() => {
                  resetToRouteName(navigation, buttonToDisplay.routeName);
                }}
              />
            ))}
          {[...buttonsToDisplay].splice(maxNumerInRow).length > 0 ? (
            !isExpanded ? (
              <NavBarButton
                title={t("general.more")}
                iconName="arrow-up"
                onPress={() => {
                  expandNavBar();
                }}
              />
            ) : (
              <NavBarButton
                title={t("general.less")}
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

import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {AppDropdownSelect, DropdownSelectData} from "../../components/AppDropdownSelect";
import i18next from "../../localization/i18next";
import {OrganizationRole, organizationRoles} from "../../api/types";

interface UserListCardProps {
  name: string;
  lastname: string;
  email: string;
  role?: OrganizationRole
  style?: any;
}

export const UserListCard = ({
                               name,
                               lastname,
                               email,
                               role,
                               style,
                             }: UserListCardProps) => {
  const [selectedOption, setSelectedOption] = useState<DropdownSelectData | null>(null);

  const handleItemSelect = (itemIndex: number) => {
    console.log("SELECTED option}")
  };


  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <FontAwesome
          name="user"
          size={35}
          color="#016531"
          style={styles.likeIconStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name + " " + lastname}</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <AppDropdownSelect
        data={mapRolesToDropdownSelectData()}
        currentItem={mapCurrentRoleToDropdownSelectData(role)}
        onItemSelect={(item: DropdownSelectData) => handleItemSelect(item.index)}
        dropdownContainerStyle={{minWidth: 100, maxHeight: 100}}
        fontSize={10}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 13,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 11,
    color: "grey",
  },
  modalSelector: {
    marginLeft: "auto",
    width: 120,
  },
  likeIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
  },
  likeIconStyle: {
    textShadowColor: "grey",
    textShadowRadius: 2,
  },
});


const mapRolesToDropdownSelectData = (): DropdownSelectData[] => {
  return organizationRoles.map<DropdownSelectData>((role) => {
    return {index: role.index.toString(), value: role.translation};
  });
};

const mapCurrentRoleToDropdownSelectData = (role): DropdownSelectData => {
  console.log(`ROLE of ${role != null ? role.toString() : "USER"}`)
  return {
    index: role != null ? role.toString() : "USER",
    value: i18next.t(`roles.${role != null ? role.toString() : "USER"}`),
  };
};
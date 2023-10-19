import React from "react"
import { Feather } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { resetToRouteName } from "./navigation/BottomNavBar"

export const AppNewPageButton = ({ page }) => {
  const navigation  = useNavigation();
  const handlePress = () => {
    resetToRouteName(navigation, page)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Feather name={"chevron-right"} size={24} color="black" />
    </TouchableOpacity>
  )
}
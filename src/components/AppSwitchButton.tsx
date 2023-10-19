import React, { useState } from "react"
import { Switch } from "react-native"
import i18next from "../localization/i18next";

export const AppSwitchButton = ({ onToggle, isEnabled }) => {
  const [_isEnabled, setIsEnabled] = useState(isEnabled);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onToggle();
  }

  return (
    <Switch
      trackColor={{false: '#000000', true:"#016531"}}
      thumbColor={_isEnabled ? "#fefefe" : "#fefefe"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={_isEnabled}
    />
  );
}
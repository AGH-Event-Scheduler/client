import React, { useState } from "react"
import { Switch } from "react-native"

export const AppSwitchButton = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onToggle();
  }

  return (
    <Switch
      trackColor={{false: '#000000', true:"#016531"}}
      thumbColor={isEnabled ? "#fefefe" : "#fefefe"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}